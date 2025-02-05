import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Category update validation schema
const categoryUpdateSchema = z.object({
  name: z.string().min(3, "Numele trebuie să aibă cel puțin 3 caractere"),
  description: z.string().min(10, "Descrierea trebuie să aibă cel puțin 10 caractere"),
  image: z.string().url("Vă rugăm să introduceți un URL valid pentru imagine")
});

// GET /api/categories/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria nu a fost găsită" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Eroare la încărcarea categoriei" },
      { status: 500 }
    );
  }
}

// PATCH /api/categories/[id]
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const validatedData = categoryUpdateSchema.parse(data);

    const category = await prisma.category.update({
      where: { id: params.id },
      data: validatedData
    });

    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Categoria nu a fost găsită" }, { status: 404 });
    }
    console.error("Eroare la actualizarea categoriei:", error);
    return NextResponse.json({ error: "Eroare la actualizarea categoriei" }, { status: 500 });
  }
}

// DELETE /api/categories/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if category has products
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria nu a fost găsită" },
        { status: 404 }
      );
    }

    if (category.products.length > 0) {
      return NextResponse.json(
        {
          error:
            "Nu se poate șterge categoria deoarece există produse asociate",
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Categoria a fost ștearsă" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Eroare la ștergerea categoriei" },
      { status: 500 }
    );
  }
} 