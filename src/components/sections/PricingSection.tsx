import PricingSectionClient from "./PricingSection.client";
import { businessPlans, residentialPlans } from "@/data/pricing-plans";

export default function PricingSection() {
  return (
    <PricingSectionClient
      residentialPlans={residentialPlans}
      businessPlans={businessPlans}
      residentialLabel="Persoane fizice"
      businessLabel="Persoane juridice"
    />
  );
}
