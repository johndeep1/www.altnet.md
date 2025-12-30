import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PUBLIC_API_BASE_URL } from "@/lib/backend-api";
import { mapPublicProductDetail } from "@/lib/catalog-mappers";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/products/${encodeURIComponent(params.id)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (response.status === 404) {
      return NextResponse.json(
        { error: "Product not found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const product = mapPublicProductDetail(
      (payload?.data ?? payload) as Record<string, unknown>
    );

    // Revalidate the product page and related category page
    revalidatePath(`/magazin/products/${product.id}`);
    revalidatePath(`/magazin/categories/${product.category.id}`);

    return NextResponse.json(product, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return NextResponse.json(
      { error: "Internal error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
