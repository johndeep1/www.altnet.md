import { NextResponse } from "next/server";
import {
  arrangePricingPlans,
  mapServicePackageToPricingPlan,
  type ServicePackagePlan,
} from "@/lib/packagePlans";
import { defaultPlans } from "@/data/pricing-plans";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";

export async function GET() {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/service-packages${buildQueryString({
        limit: 100,
        offset: 0,
      })}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const { data } = parseListResponse<ServicePackagePlan>(payload);
    const mapped = data.map((plan) => mapServicePackageToPricingPlan(plan));
    const arranged = arrangePricingPlans(mapped);
    return NextResponse.json(arranged.length ? arranged : mapped);
  } catch (error) {
    console.error("Failed to load public packages", error);
    return NextResponse.json(defaultPlans, { status: 200 });
  }
}
