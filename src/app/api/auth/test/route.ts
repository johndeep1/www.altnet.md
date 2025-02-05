import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Try to count users as a simple test
    const count = await prisma.user.count();
    return NextResponse.json({ success: true, userCount: count });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
