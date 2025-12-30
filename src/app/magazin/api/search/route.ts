import { NextResponse } from "next/server";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import { mapPublicProductSummary } from "@/lib/catalog-mappers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/products${buildQueryString({
        search: query,
        limit: 5,
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
    const products = data.map(mapPublicProductSummary);

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
