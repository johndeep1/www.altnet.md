import { NextResponse } from "next/server";
import { CORE_API_BASE_URL } from "@/lib/backend-api";
import {
  mapServicePackageToAdminPlan,
  type ServicePackagePlan,
} from "@/lib/packagePlans";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${CORE_API_BASE_URL}/service-packages/${encodeURIComponent(params.id)}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return NextResponse.json({ error: "Pachetul nu a fost găsit" }, { status: 404 });
    }

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const record = (payload?.data ?? payload) as ServicePackagePlan;
    const plan = mapServicePackageToAdminPlan(record);

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Failed to fetch package", error);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Actualizarea pachetelor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Stergerea pachetelor este indisponibila in API-ul curent." },
    { status: 501 }
  );
}
