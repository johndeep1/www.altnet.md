import { NextResponse } from "next/server";
import { CORE_API_BASE_URL, safeString } from "@/lib/backend-api";

// GET /api/categories/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/categories/${encodeURIComponent(params.id)}`,
      { cache: "no-store" }
    );

    if (response.status === 404) {
      return NextResponse.json(
        { error: "Categoria nu a fost gasita" },
        { status: 404 }
      );
    }

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const record = (payload?.data ?? payload) as Record<string, unknown>;

    return NextResponse.json({
      id: safeString(record.id, ""),
      name: safeString(record.name, ""),
      description: safeString(record.description, ""),
      image: safeString(record.image_url, ""),
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Eroare la incarcarea categoriei" },
      { status: 500 }
    );
  }
}

// PATCH /api/categories/[id]
export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Actualizarea categoriilor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}

// DELETE /api/categories/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Stergerea categoriilor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
