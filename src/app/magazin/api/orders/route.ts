import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    const where = {
      ...(status ? { status } : {}),
      ...(email ? { email } : {}),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  images: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as OrderData;
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "";

    // Validate input
    if (!data.customerName || !data.email || !data.phone || !data.items || !data.total) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        total: data.total,
        items: {
          create: data.items.map((item: OrderItem) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Update product stock levels
    await Promise.all(
      data.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.id },
          select: { stock: true },
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.name}`);
        }

        return prisma.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        });
      })
    );

    // Send confirmation email using absolute URL
    const confirmationUrl = `${protocol}://${host}/api/order-confirmation`;
    await fetch(confirmationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        items: order.items.map((item) => ({
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
        })),
        total: Number(order.total),
      }),
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error creating order",
      { status: 500 }
    );
  }
} 