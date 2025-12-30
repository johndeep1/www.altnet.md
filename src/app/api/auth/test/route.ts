import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Testul de autentificare este dezactivat fara baza de date." },
    { status: 503 }
  );
}
