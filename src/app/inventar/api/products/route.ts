import { NextResponse } from "next/server";
import {
  CORE_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import { mapAdminProduct } from "@/lib/catalog-mappers";

// GET /inventar/api/products
export async function GET(_request: Request) {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/products${buildQueryString({
        limit: 100,
        offset: 0,
      })}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const { data } = parseListResponse<Record<string, unknown>>(payload);
    return NextResponse.json(data.map(mapAdminProduct));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST /inventar/api/products
export async function POST(_request: Request) {
  return NextResponse.json(
    { error: "Administrarea produselor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
