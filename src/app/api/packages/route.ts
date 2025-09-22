import { NextResponse } from "next/server";
import prisma from "@/app/magazin/lib/prisma";
import {
  arrangePricingPlans,
  mapPackagePlanToPricingPlan,
} from "@/lib/packagePlans";
import { defaultPlans } from "@/data/pricing-plans";

export async function GET() {
  try {
    const plans = await prisma.packagePlan.findMany({
      orderBy: { price: "asc" },
    });

    if (!plans.length) {
      return NextResponse.json(defaultPlans);
    }

    const mapped = plans.map(mapPackagePlanToPricingPlan);
    const arranged = arrangePricingPlans(mapped);

    return NextResponse.json(arranged);
  } catch (error) {
    console.error("Failed to load public packages", error);
    return NextResponse.json(defaultPlans, { status: 200 });
  }
}
