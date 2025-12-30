import type { PricingPlan } from "@/data/pricing-plans";
import { defaultPlans } from "@/data/pricing-plans";

export interface AdminPackagePlan {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  price: number;
  speed: string;
  gradient: string;
  features: PricingPlan["features"];
  popularFeatures: PricingPlan["popularFeatures"];
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

const timestamp = "2024-08-20T10:00:00Z";

const adminPlans: AdminPackagePlan[] = defaultPlans.map((plan, index) => ({
  id: `plan-${index + 1}`,
  title: plan.title,
  slug: plan.slug,
  subtitle: plan.subtitle || null,
  price: plan.price,
  speed: plan.speed,
  gradient: plan.gradient,
  features: plan.features,
  popularFeatures: plan.popularFeatures,
  isPopular: Boolean(plan.featured),
  createdAt: timestamp,
  updatedAt: timestamp,
}));

export const getAdminPackagePlans = () => adminPlans;

export const getAdminPackagePlanById = (id: string) =>
  adminPlans.find((plan) => plan.id === id) ?? null;

export const getPublicPackagePlans = () => defaultPlans;
