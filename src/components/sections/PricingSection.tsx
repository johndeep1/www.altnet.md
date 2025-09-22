import PricingSectionClient from "./PricingSection.client";
import prisma from "@/app/magazin/lib/prisma";
import type { PricingPlan } from "@/data/pricing-plans";
import { defaultPlans } from "@/data/pricing-plans";
import { cache } from "react";
import {
  arrangePricingPlans,
  mapPackagePlanToPricingPlan,
} from "@/lib/packagePlans";

const fetchPackagePlans = cache(async (): Promise<PricingPlan[]> => {
  try {
    const plans = await prisma.packagePlan.findMany({
      orderBy: {
        price: "asc",
      },
    });

    if (!plans.length) {
      return defaultPlans;
    }

    const normalized = plans.map(mapPackagePlanToPricingPlan);
    const arranged = arrangePricingPlans(normalized);

    return arranged.length ? arranged : defaultPlans;
  } catch (error) {
    console.error("Failed to load package plans", error);
    return defaultPlans;
  }
});

export default async function PricingSection() {
  const plans = await fetchPackagePlans();
  return <PricingSectionClient plans={plans} />;
}
