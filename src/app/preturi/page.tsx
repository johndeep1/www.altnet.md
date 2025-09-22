"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PricingCards from "@/components/pricing/PricingCards";
import type { PricingPlan } from "@/data/pricing-plans";
import { defaultPlans } from "@/data/pricing-plans";
import { CheckIcon } from "@heroicons/react/24/outline";

// First define an interface for the feature type
interface ComparisonFeature {
  name: string;
  tv: string | boolean;
  popular: string | boolean;
  premium: string | boolean;
  highlight?: boolean;
}

const comparisonFeatures = [
  {
    category: "Internet",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    features: [
      {
        name: "Viteză Download",
        tv: "-",
        popular: "600 Mbps",
        premium: "1000 Mbps",
      },
      {
        name: "Viteză Upload",
        tv: "-",
        popular: "600 Mbps",
        premium: "1000 Mbps",
      },
      {
        name: "Router WiFi",
        tv: "-",
        popular: "WiFi 6",
        premium: "WiFi 6E",
      },
      { name: "IP Static", tv: false, popular: true, premium: true },
      { name: "IPv6", tv: false, popular: true, premium: true },
      {
        name: "Instalare",
        tv: "Gratuită",
        popular: "Gratuită",
        premium: "Prioritară",
      },
    ] as ComparisonFeature[],
  },
  {
    category: "TV Digital",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    features: [
      { name: "Canale TV", tv: "200+ canale", popular: "HD", premium: "Premium" },
      { name: "TV pe mobil", tv: true, popular: true, premium: true },
      {
        name: "Multi-screen",
        tv: "1 device",
        popular: "2 devices",
        premium: "4 devices",
      },
      {
        name: "Cadou Televizor",
        tv: false,
        popular: false,
        premium: "45 inch",
        highlight: true,
      },
    ] as ComparisonFeature[],
  },

];

export default function PricingPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);

  const pricingPlans = useMemo(() => {
    return plans.length ? plans : defaultPlans;
  }, [plans]);

  const comparisonPlans = useMemo(() => {
    const primary = pricingPlans.slice(0, 3);
    if (primary.length === 3) return primary;

    const fallback: PricingPlan[] = [...primary];
    for (const plan of defaultPlans) {
      if (fallback.length >= 3) break;
      if (!fallback.some((item) => item.slug === plan.slug)) {
        fallback.push(plan);
      }
    }

    return fallback.slice(0, 3);
  }, [pricingPlans]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPlans() {
      try {
        const response = await fetch("/api/packages");
        if (!response.ok) return;
        const data = await response.json();
        if (!isMounted) return;
        if (Array.isArray(data) && data.length) {
          setPlans(data);
        }
      } catch (error) {
        console.error("Failed to load pricing plans", error);
      }
    }

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen pt-32 pb-16 relative">
      {/* Consistent Background */}
      {/* <ConsistentBackground /> */}

      {/* Hero Section with 3D Element */}
      <section className="relative mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Pachete și <span className="text-primary">Prețuri</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Alege pachetul perfect pentru tine cu servicii de calitate la
                prețuri competitive
              </p>
              <div className="flex flex-wrap gap-4">
                {["Internet", "TV"].map((service) => (
                  <motion.div
                    key={service}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100
                             flex items-center gap-2 text-gray-600 hover:text-primary
                             hover:border-primary/20 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3D Network Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square relative">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Background Circles */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="160"
                      className="fill-none stroke-gray-100"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      className="fill-none stroke-gray-100"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="80"
                      className="fill-none stroke-gray-100"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </motion.g>

                  {/* Animated Connection Lines */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Main Router in Center */}
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="15"
                      className="fill-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    />

                    {/* Connection Points */}
                    {[
                      [120, 120],
                      [280, 120], // Top points
                      [120, 280],
                      [280, 280], // Bottom points
                      [100, 200],
                      [300, 200], // Side points
                      [200, 100],
                      [200, 300], // Top and bottom center points
                    ].map(([cx, cy], i) => (
                      <motion.g key={i}>
                        {/* Connection Line */}
                        <motion.line
                          x1="200"
                          y1="200"
                          x2={cx}
                          y2={cy}
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary/20"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                        {/* Connection Point */}
                        <motion.circle
                          cx={cx}
                          cy={cy}
                          r="6"
                          className="fill-primary"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                        {/* Pulse Effect */}
                        <motion.circle
                          cx={cx}
                          cy={cy}
                          r="6"
                          className="fill-primary"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1 + i * 0.2,
                          }}
                        />
                      </motion.g>
                    ))}

                    {/* Data Flow Animation */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.circle
                        key={`data-${i}`}
                        cx="200"
                        cy="200"
                        r="40"
                        className="fill-none stroke-primary/10"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.75,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </motion.g>

                  {/* Decorative Elements */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 }}
                  >
                    {[45, 135, 225, 315].map((angle, i) => (
                      <motion.path
                        key={`deco-${i}`}
                        d={`M200 200 L${
                          200 + 180 * Math.cos((angle * Math.PI) / 180)
                        } ${200 + 180 * Math.sin((angle * Math.PI) / 180)}`}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="text-gray-200"
                      />
                    ))}
                  </motion.g>
                </svg>

                {/* Speed Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm
                           px-4 py-2 rounded-full border border-gray-200/50
                           text-sm font-medium text-gray-600"
                >
                  1000 Mbps
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm
                           px-4 py-2 rounded-full border border-gray-200/50
                           text-sm font-medium text-gray-600"
                >
                  Fibră Optică
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCards plans={pricingPlans} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compară Pachetele
            </h2>
            <p className="text-gray-600">
              Vezi toate detaliile și alege pachetul potrivit pentru tine
            </p>
          </motion.div>

          {/* Added responsive container */}
          <div className="mt-8">
            {/* Desktop Version */}
            <div className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-6 px-6 text-left text-gray-500 font-medium w-1/4">
                      <span className="sr-only">Caracteristici</span>
                    </th>
                    {comparisonPlans.map((plan) => (
                      <th
                        key={plan.title}
                        className={`py-6 px-6 text-center w-1/4 relative
                          ${plan.featured ? "text-primary" : "text-gray-900"}`}
                      >
                        {plan.featured && (
                          <div className="absolute -top-3 left-0 right-0">
                            <span
                              className="px-4 py-1.5 bg-primary text-white text-sm
                                         font-medium rounded-full inline-block"
                            >
                              Recomandat
                            </span>
                          </div>
                        )}
                        <div className="font-bold text-lg mb-2 mt-4">
                          {plan.title}
                        </div>
                        <div className="flex items-baseline justify-center gap-1">
                          <span
                            className={`text-2xl font-bold
                            ${
                              plan.featured ? "text-primary" : "text-gray-900"
                            }`}
                          >
                            {plan.price}
                          </span>
                          <span className="text-gray-500 text-sm">
                            lei/lună
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((section, sectionIndex) => [
                    <tr
                      key={`section-${section.category}`}
                      className="border-t border-gray-100"
                    >
                      <td
                        colSpan={4}
                        className="py-4 px-6 text-left text-gray-900 font-semibold
                                 bg-gray-50/80 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-primary">{section.icon}</div>
                          {section.category}
                        </div>
                      </td>
                    </tr>,
                    ...section.features.map((feature, featureIndex) => (
                      <motion.tr
                        key={`feature-${section.category}-${feature.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: sectionIndex * 0.1 + featureIndex * 0.05,
                        }}
                        className={`border-t border-gray-100 hover:bg-gray-50/50 ${
                          feature.highlight ? "bg-primary/5" : ""
                        }`}
                      >
                        <td className={`py-4 px-6 text-left ${
                          feature.highlight ? "font-medium text-primary" : "text-gray-600"
                        }`}>
                          {feature.name}
                        </td>
                        {comparisonPlans.map((_, columnIndex) => {
                          const planType = columnIndex === 0
                            ? "tv"
                            : columnIndex === 1
                            ? "popular"
                            : "premium";
                          return (
                            <td
                              key={planType}
                              className={`py-4 px-6 text-center ${
                                feature.highlight && planType === "premium"
                                  ? "font-bold text-primary"
                                  : ""
                              }`}
                            >
                              {typeof feature[planType] === "boolean" ? (
                                feature[planType] ? (
                                  <CheckIcon className="w-5 h-5 text-primary mx-auto" />
                                ) : (
                                  <span className="block w-5 h-0.5 bg-gray-300 mx-auto rounded-full" />
                                )
                              ) : feature[planType] === "-" ? (
                                <span className="text-gray-400">—</span>
                              ) : (
                                <span
                                  className={`font-medium
                                ${
                                  planType === "popular" && !feature.highlight
                                    ? "text-primary"
                                    : feature.highlight && planType === "premium"
                                    ? "text-primary bg-primary/10 px-2 py-1 rounded-md inline-block"
                                    : "text-gray-900"
                                }`}
                                >
                                  {feature[planType]}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    )),
                  ])}
                </tbody>
              </table>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden space-y-8">
              {comparisonPlans.map((plan, index) => (
                <div
                  key={plan.title}
                  className="relative rounded-xl border border-gray-200 bg-white shadow-lg p-6"
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className="px-4 py-1.5 bg-primary text-white text-sm
                                   font-medium rounded-full inline-block whitespace-nowrap"
                      >
                        Recomandat
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`font-bold text-xl mb-2 mt-4
                      ${plan.featured ? "text-primary" : "text-gray-900"}`}
                    >
                      {plan.title}
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span
                        className={`text-3xl font-bold
                        ${plan.featured ? "text-primary" : "text-gray-900"}`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-gray-500">lei/lună</span>
                    </div>
                  </div>

                  {/* Mobile Features List */}
                  <div className="space-y-4">
                    {comparisonFeatures.map((section) => (
                      <div key={section.category}>
                        <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                          <div className="text-primary">{section.icon}</div>
                          {section.category}
                        </div>
                        <div className="space-y-2">
                          {section.features.map((feature) => {
                            const planType = index === 0
                              ? "tv"
                              : index === 1
                              ? "popular"
                              : "premium";
                            return (
                              <div
                                key={feature.name}
                                className={`flex justify-between text-sm ${
                                  feature.highlight ? "bg-primary/5 p-2 rounded-lg" : ""
                                }`}
                              >
                                <span className={`${
                                  feature.highlight ? "font-medium text-primary" : "text-gray-600"
                                }`}>
                                  {feature.name}
                                </span>
                                <span className={`font-medium ${
                                  feature.highlight && planType === "premium"
                                    ? "text-primary bg-primary/10 px-2 py-1 rounded-md"
                                    : "text-gray-900"
                                }`}>
                                  {typeof feature[planType] === "boolean" ? (
                                    feature[planType] ? (
                                      <CheckIcon className="w-5 h-5 text-primary" />
                                    ) : (
                                      <span className="block w-5 h-0.5 bg-gray-300 rounded-full" />
                                    )
                                  ) : feature[planType] === "-" ? (
                                    <span className="text-gray-400">—</span>
                                  ) : (
                                    feature[planType]
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pregătit să Începi?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o ofertă personalizată sau pentru mai multe
              detalii
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact")}
              className="px-8 py-4 bg-primary text-white rounded-xl font-medium
                     shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              Contactează-ne
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
