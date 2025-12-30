import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import { mapPublicCategory } from "@/lib/catalog-mappers";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/categories${buildQueryString({
        limit: 100,
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
    const categories = data.map(mapPublicCategory).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Revalidate the home page and categories pages
    revalidatePath("/magazin");
    revalidatePath("/magazin/categories");

    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
