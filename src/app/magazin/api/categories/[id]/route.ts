import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import {
  mapPublicCategory,
  mapPublicProductSummary,
} from "@/lib/catalog-mappers";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryResponse = await fetch(
      `${PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(params.id)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (categoryResponse.status === 404) {
      return NextResponse.json(
        { error: "Category not found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    if (!categoryResponse.ok) {
      throw new Error(`Backend responded with ${categoryResponse.status}`);
    }

    const categoryPayload = await categoryResponse.json();
    const category = mapPublicCategory(
      (categoryPayload?.data ?? categoryPayload) as Record<string, unknown>
    );

    const productsResponse = await fetch(
      `${PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(params.id)}/products${buildQueryString(
        {
          limit: 100,
          offset: 0,
        }
      )}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!productsResponse.ok) {
      throw new Error(`Backend responded with ${productsResponse.status}`);
    }

    const productsPayload = await productsResponse.json();
    const { data } = parseListResponse<Record<string, unknown>>(productsPayload);
    const products = data.map(mapPublicProductSummary);

    // Revalidate the category page
    revalidatePath(`/magazin/categories/${params.id}`);

    return NextResponse.json(
      {
        ...category,
        products,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
