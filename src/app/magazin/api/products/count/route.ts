import { NextResponse } from "next/server";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/products${buildQueryString({
        limit: 1,
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
    const { data, meta } = parseListResponse<Record<string, unknown>>(payload);
    const count = meta?.total ?? data.length;
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching product count:", error);
    return NextResponse.json(
      { error: "Failed to fetch product count" },
      { status: 500 }
    );
  }
}
