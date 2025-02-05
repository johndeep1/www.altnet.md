import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Product validation schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .or(z.string())
    .transform((val) => Number(val)), // Handle both string and number inputs
  sku: z.string().min(1, "SKU is required"),
  stock: z
    .number()
    .int()
    .nonnegative("Stock must be non-negative")
    .or(z.string())
    .transform((val) => Number(val)),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().optional(),
  specs: z.any().optional(),
  images: z.array(z.string()).optional(),
  status: z
    .enum(["ACTIVE", "OUTOFSTOCK", "DISCONTINUED", "COMINGSOON"])
    .default("ACTIVE"),
});

// GET /inventar/api/products
export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST /inventar/api/products
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = productSchema.parse(json);

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        sku: validatedData.sku,
        stock: validatedData.stock,
        categoryId: validatedData.categoryId,
        brand: validatedData.brand,
        model: validatedData.model,
        specs: validatedData.specs,
        images: validatedData.images || [],
        status: validatedData.status,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
