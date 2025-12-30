import { NextResponse } from "next/server";
import { PUBLIC_API_BASE_URL } from "@/lib/backend-api";
import { mapPublicProductSummary } from "@/lib/catalog-mappers";

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const products = await Promise.all(
      productIds.map(async (id: string) => {
        try {
          const response = await fetch(
            `${PUBLIC_API_BASE_URL}/products/${encodeURIComponent(id)}`,
            { cache: "no-store" }
          );

          if (!response.ok) {
            return { id, stock: 0 };
          }

          const payload = await response.json();
          const product = mapPublicProductSummary(
            (payload?.data ?? payload) as Record<string, unknown>
          );

          return {
            id: product.id || id,
            stock: product.stock,
          };
        } catch (error) {
          console.error("Error fetching stock for product:", id, error);
          return { id, stock: 0 };
        }
      })
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error checking stock levels:", error);
    return NextResponse.json(
      { error: "Failed to check stock levels" },
      { status: 500 }
    );
  }
}
