import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  return NextResponse.json(
    { error: "Autentificarea este dezactivata fara baza de date." },
    { status: 503 }
  );
}
