import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Product update validation schema
const productUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be positive").optional(),
  sku: z.string().optional(),
  stock: z.number().int().nonnegative("Stock must be non-negative").optional(),
  categoryId: z.string().min(1, "Category is required").optional(),
  brand: z.string().min(1, "Brand is required").optional(),
  model: z.string().optional(),
  specs: z.any().optional(),
  images: z.array(z.string()).optional(),
  status: z
    .enum(["ACTIVE", "OUTOFSTOCK", "DISCONTINUED", "COMINGSOON"])
    .optional(),
});

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const validatedData = productUpdateSchema.parse({
      ...json,
      price: json.price ? Number(json.price) : undefined,
      stock: json.stock ? Number(json.stock) : undefined,
    });

    // Handle specs properly
    const specs =
      validatedData.specs === null
        ? null
        : validatedData.specs
        ? JSON.stringify(validatedData.specs)
        : undefined;

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        specs: specs ? specs : undefined,
      },
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
