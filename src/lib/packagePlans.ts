import type { PackagePlan } from "@prisma/client";
import type { PricingPlan, PricingFeature } from "@/data/pricing-plans";

export const DEFAULT_GRADIENT = "from-primary via-primary-dark to-primary";

const isPricingFeature = (value: unknown): value is PricingFeature => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.text === "string" && record.text.trim().length > 0;
};

export const parseFeatures = (value: unknown): PricingFeature[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!isPricingFeature(item)) return null;
      const record = item as Record<string, unknown>;
      return {
        text: String(record.text),
        included: Boolean(record.included),
        highlight: Boolean(record.highlight),
      } satisfies PricingFeature;
    })
    .filter((item): item is PricingFeature => Boolean(item));
};

export const parsePopularFeatures = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
};

export const mapPackagePlanToPricingPlan = (plan: PackagePlan): PricingPlan => {
  return {
    id: plan.id,
    slug: plan.slug,
    title: plan.title,
    subtitle: plan.subtitle ?? "",
    price: Number(plan.price),
    speed: plan.speed,
    gradient: plan.gradient || DEFAULT_GRADIENT,
    features: parseFeatures(plan.features),
    popularFeatures: parsePopularFeatures(plan.popularFeatures),
    featured: plan.isPopular,
  } satisfies PricingPlan;
};

export const arrangePricingPlans = (plans: PricingPlan[]): PricingPlan[] => {
  if (plans.length <= 1) {
    return plans;
  }

  const popularPlan = plans.find((plan) => plan.featured);
  if (!popularPlan) {
    return plans.sort((a, b) => a.price - b.price).slice(0, 3);
  }

  const others = plans
    .filter((plan) => plan.slug !== popularPlan.slug)
    .sort((a, b) => a.price - b.price);

  if (!others.length) {
    return [popularPlan];
  }

  const ordered: PricingPlan[] = [];
  if (others.length >= 1) {
    ordered.push(others[0]);
  }

  ordered.push(popularPlan);

  if (others.length >= 2) {
    ordered.push(others[others.length - 1]);
  }

  return ordered.slice(0, 3);
};
