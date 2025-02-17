import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  try {
    const count = await prisma.product.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching product count:", error);
    return NextResponse.json(
      { error: "Failed to fetch product count" },
      { status: 500 }
    );
  }
}
