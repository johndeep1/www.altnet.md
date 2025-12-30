import type { PricingFeature, PricingPlan } from "@/data/pricing-plans";
import { slugify } from "@/lib/backend-api";

export const DEFAULT_GRADIENT = "from-primary via-primary-dark to-primary";

export interface ServicePackagePlan {
  id: string;
  type_id?: string | null;
  type_name?: string | null;
  name: string;
  name_ro?: string | null;
  name_ru?: string | null;
  price: number | string;
  network_speed?: string | null;
  benefits?: string[] | null;
  special_benefits?: string[] | null;
  sort_order?: number | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

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

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const buildFeatures = (
  benefits: string[],
  specialBenefits: string[]
): PricingFeature[] => {
  const base = benefits.map((benefit) => ({
    text: benefit,
    included: true,
  }));

  const highlighted = specialBenefits.map((benefit) => ({
    text: benefit,
    included: true,
    highlight: true,
  }));

  return [...highlighted, ...base];
};

const getPopularFeatures = (benefits: string[], specialBenefits: string[]) => {
  if (specialBenefits.length) return specialBenefits;
  return benefits.slice(0, 3);
};

const isPopularPlan = (name: string) =>
  name.toLowerCase().includes("popular") ||
  name.toLowerCase().includes("premium");

export const mapServicePackageToPricingPlan = (
  plan: ServicePackagePlan
): PricingPlan => {
  const benefits = toStringArray(plan.benefits);
  const specialBenefits = toStringArray(plan.special_benefits);
  const title = plan.name?.trim() || "Pachet";
  const slug =
    slugify(plan.name ?? "") ||
    slugify(plan.name_ro ?? "") ||
    slugify(plan.name_ru ?? "") ||
    slugify(plan.type_name ?? "") ||
    `plan-${plan.id}`;

  return {
    id: plan.id,
    slug,
    title,
    subtitle: plan.type_name ?? null,
    price: Number(plan.price) || 0,
    speed: plan.network_speed ?? "",
    gradient: DEFAULT_GRADIENT,
    features: buildFeatures(benefits, specialBenefits),
    popularFeatures: getPopularFeatures(benefits, specialBenefits),
    featured: isPopularPlan(title),
  } satisfies PricingPlan;
};

export const mapServicePackageToAdminPlan = (
  plan: ServicePackagePlan
): AdminPackagePlan => {
  const pricingPlan = mapServicePackageToPricingPlan(plan);

  return {
    id: pricingPlan.id ?? plan.id,
    title: pricingPlan.title,
    slug: pricingPlan.slug,
    subtitle: pricingPlan.subtitle ?? null,
    price: pricingPlan.price,
    speed: pricingPlan.speed,
    gradient: pricingPlan.gradient,
    features: pricingPlan.features,
    popularFeatures: pricingPlan.popularFeatures,
    isPopular: Boolean(pricingPlan.featured),
    createdAt: plan.created_at ?? new Date().toISOString(),
    updatedAt: plan.updated_at ?? new Date().toISOString(),
  };
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
