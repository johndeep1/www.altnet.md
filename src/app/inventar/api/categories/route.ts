import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Category validation schema
const categorySchema = z.object({
  name: z.string().min(3, "Numele trebuie să aibă cel puțin 3 caractere"),
  description: z
    .string()
    .min(10, "Descrierea trebuie să aibă cel puțin 10 caractere"),
  image: z.string().url("Vă rugăm să introduceți un URL valid pentru imagine"),
});

// GET /inventar/api/categories
export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

// POST /inventar/api/categories
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = categorySchema.parse(data);

    const category = await prisma.category.create({
      data: validatedData,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Există deja o categorie cu acest nume" },
        { status: 400 }
      );
    }
    console.error("Eroare la crearea categoriei:", error);
    return NextResponse.json(
      { error: "Eroare la crearea categoriei" },
      { status: 500 }
    );
  }
}
