import { NextResponse } from "next/server";
import { CORE_API_BASE_URL } from "@/lib/backend-api";
import { mapPublicProductDetail } from "@/lib/catalog-mappers";

// GET /api/products/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/products/${encodeURIComponent(params.id)}`,
      { cache: "no-store" }
    );

    if (response.status === 404) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const product = mapPublicProductDetail(
      (payload?.data ?? payload) as Record<string, unknown>
    );

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
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Actualizarea produselor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}

// DELETE /api/products/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Stergerea produselor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
