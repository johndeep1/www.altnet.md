import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import { mapPublicProductSummary } from "@/lib/catalog-mappers";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/products${buildQueryString({
        limit: 8,
        offset: 0,
      })}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const { data } = parseListResponse<Record<string, unknown>>(payload);
    const products = data.map(mapPublicProductSummary);

    // Revalidate the home page
    revalidatePath("/magazin");

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent products" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
