import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { defaultPlans } from "@/data/pricing-plans";
import type { PricingPlan } from "@/data/pricing-plans";
import { cache } from "react";
import {
  mapServicePackageToPricingPlan,
  type ServicePackagePlan,
} from "@/lib/packagePlans";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import PackageOrderForm from "./PackageOrderForm";

const buildPlanSchema = (plan: PricingPlan) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Pachet ${plan.title} - Altnet`,
  description: `Internet prin fibră optică cu viteza de ${plan.speed} la doar ${plan.price} lei/lună. Instalare gratuită și asistență tehnică permanentă.`,
  brand: {
    "@type": "Brand",
    name: "Altnet",
  },
  offers: {
    "@type": "Offer",
    price: String(plan.price),
    priceCurrency: "MDL",
    availability: "https://schema.org/InStock",
  },
});

const fetchPackagePlans = cache(async (): Promise<PricingPlan[]> => {
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
    return data.map((plan) => mapServicePackageToPricingPlan(plan));
  } catch (error) {
    console.error("Failed to load package plans", error);
    return defaultPlans;
  }
});

async function getPlanBySlug(slug: string): Promise<PricingPlan> {
  const normalizedSlug = slug.toLowerCase();
  const plans = await fetchPackagePlans();

  const match = plans.find((item) =>
    [item.slug.toLowerCase(), item.title.toLowerCase()].includes(normalizedSlug)
  );

  if (!match) {
    notFound();
  }

  return match;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const plan = await getPlanBySlug(params.slug);

  return {
    title: `Pachet ${plan.title} - Viteză ${plan.speed} - Altnet Moldova`,
    description: `Comandă pachetul de internet ${plan.title} cu viteza de ${plan.speed} la doar ${plan.price} lei/lună. Instalare gratuită și asistență tehnică permanentă.`,
    openGraph: {
      title: `Pachet ${plan.title} - Altnet`,
      description: `Internet prin fibră optică cu viteza de ${plan.speed} la doar ${plan.price} lei/lună.`,
      url: `/pachete/${plan.slug}`,
    },
  };
}

export default async function PackagePage({
  params,
}: {
  params: { slug: string };
}) {
  const plan = await getPlanBySlug(params.slug);
  const schema = buildPlanSchema(plan);

  return (
    <>
      <Script id={`product-schema-${plan.slug}`} type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      <PackageOrderForm plan={plan} />
    </>
  );
}
