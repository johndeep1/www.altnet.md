import PricingSectionClient from "./PricingSection.client";
import type { PricingPlan } from "@/data/pricing-plans";
import { defaultPlans } from "@/data/pricing-plans";
import { cache } from "react";
import {
  arrangePricingPlans,
  mapServicePackageToPricingPlan,
  type ServicePackagePlan,
} from "@/lib/packagePlans";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
  slugify,
} from "@/lib/backend-api";

const POPULAR_LABEL = "Pachete populare";
const LEU_LABEL = "Produs 1 leu";
const POPULAR_KEY = slugify(POPULAR_LABEL);
const LEU_KEY = slugify(LEU_LABEL);

type PricingPlansByType = {
  popular: PricingPlan[];
  leu: PricingPlan[];
};

const fetchPackagePlans = cache(async (): Promise<PricingPlansByType> => {
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

    const buckets: PricingPlansByType = {
      popular: [],
      leu: [],
    };

    data.forEach((plan) => {
      const typeKey = slugify(plan.type_name ?? "");
      const mapped = mapServicePackageToPricingPlan(plan);
      if (typeKey === LEU_KEY) {
        buckets.leu.push(mapped);
        return;
      }
      buckets.popular.push(mapped);
    });

    return {
      popular: arrangePricingPlans(buckets.popular),
      leu: arrangePricingPlans(buckets.leu),
    };
  } catch (error) {
    console.error("Failed to load pricing plans", error);
    const arranged = arrangePricingPlans(defaultPlans);
    return {
      popular: arranged.length ? arranged : defaultPlans,
      leu: [],
    };
  }
});

export default async function PricingSection() {
  const plansByType = await fetchPackagePlans();
  return (
    <PricingSectionClient
      popularPlans={plansByType.popular}
      promoPlans={plansByType.leu}
      popularLabel={POPULAR_LABEL}
      promoLabel={LEU_LABEL}
    />
  );
}
