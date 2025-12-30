import { NextResponse } from "next/server";
import {
  CORE_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import {
  mapServicePackageToAdminPlan,
  type ServicePackagePlan,
} from "@/lib/packagePlans";

export async function GET() {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/service-packages${buildQueryString({
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
    const { data } = parseListResponse<ServicePackagePlan>(payload);
    const plans = data.map((plan) => mapServicePackageToAdminPlan(plan));
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Failed to fetch packages", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(_request: Request) {
  return NextResponse.json(
    { error: "Administrarea pachetelor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
