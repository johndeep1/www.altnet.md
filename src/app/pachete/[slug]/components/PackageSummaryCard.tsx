"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";
import type { PricingPlan } from "@/data/pricing-plans";

interface PackageSummaryCardProps {
  plan: PricingPlan;
}

export default function PackageSummaryCard({ plan }: PackageSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 lg:p-8 overflow-hidden"
    >
      {/* Background gradient decoration */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-2xl`}
      />

      {/* Featured badge */}
      {plan.featured && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-0">
          <span
            className={`px-4 py-1.5 rounded-b-xl text-xs font-medium bg-gradient-to-r ${plan.gradient} text-white shadow-lg`}
          >
            Cel mai popular
          </span>
        </div>
      )}

      <div className="relative">
        {/* Logo and title */}
        <div className="text-center mb-6 mt-2">
          <div className="w-16 h-16 mx-auto mb-4">
            <img
              src="/ALTNET-LOGO.svg"
              alt="ALTNET"
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
          {plan.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
          )}
        </div>

        {/* Speed badge */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              plan.featured
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Pana la {plan.speed}
          </span>
        </div>

        {/* Price display */}
        <div className="text-center mb-6 p-4 bg-gray-50/80 rounded-xl">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm text-gray-500">de la</span>
            <span
              className={`text-4xl font-bold ${
                plan.featured ? "text-primary" : "text-gray-900"
              }`}
            >
              {plan.price}
            </span>
            <span className="text-lg text-gray-500">lei</span>
          </div>
          <span className="text-xs text-gray-500">pe luna, TVA inclus</span>
        </div>

        {/* Key features list */}
        {plan.popularFeatures && plan.popularFeatures.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Inclus in pachet
            </p>
            {plan.popularFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <CheckIcon className="w-3 h-3 text-white" />
                </span>
                {feature}
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional features if available */}
        {plan.features && plan.features.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              {plan.features
                .filter((f) => f.included)
                .slice(0, 4)
                .map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <CheckIcon className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className={feature.highlight ? "font-medium text-primary" : ""}>
                      {feature.text}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
