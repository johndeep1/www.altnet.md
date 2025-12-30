import { NextResponse } from "next/server";
import {
  CORE_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import { mapAdminCategory } from "@/lib/catalog-mappers";

// GET /inventar/api/categories
export async function GET(_request: Request) {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/categories${buildQueryString({
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
    return NextResponse.json(data.map(mapAdminCategory));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

// POST /inventar/api/categories
export async function POST(_request: Request) {
  return NextResponse.json(
    { error: "Administrarea categoriilor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
