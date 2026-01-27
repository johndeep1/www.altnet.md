import PricingPageClient from "./PricingPageClient";
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
} from "@/lib/backend-api";

const fetchPricingPlans = cache(async (): Promise<PricingPlan[]> => {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/service-packages${buildQueryString({
        limit: 100,
        offset: 0,
      })}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const { data } = parseListResponse<ServicePackagePlan>(payload);
    const mapped = data.map(mapServicePackageToPricingPlan);
    return arrangePricingPlans(mapped);
  } catch (error) {
    console.error("Failed to load pricing plans", error);
    return defaultPlans;
  }
});

export default async function PricingPage() {
  const plans = await fetchPricingPlans();
  return <PricingPageClient plans={plans} />;
}
