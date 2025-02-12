import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        stock: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error checking stock levels:", error);
    return NextResponse.json(
      { error: "Failed to check stock levels" },
      { status: 500 }
    );
  }
}
