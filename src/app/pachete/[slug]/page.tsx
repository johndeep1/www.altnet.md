import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import prisma from "@/app/magazin/lib/prisma";
import { defaultPlans } from "@/data/pricing-plans";
import type { PricingPlan } from "@/data/pricing-plans";
import PackageOrderForm from "./PackageOrderForm";
import { mapPackagePlanToPricingPlan } from "@/lib/packagePlans";

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

async function getPlanBySlug(slug: string): Promise<PricingPlan> {
  const normalizedSlug = slug.toLowerCase();

  const plan = await prisma.packagePlan.findUnique({
    where: { slug: normalizedSlug },
  });

  if (plan) {
    return mapPackagePlanToPricingPlan(plan);
  }

  const fallback = defaultPlans.find((item) =>
    [item.slug.toLowerCase(), item.title.toLowerCase()].includes(normalizedSlug)
  );

  if (!fallback) {
    notFound();
  }

  return fallback;
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
