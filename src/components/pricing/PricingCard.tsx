"use client";

import { motion } from "framer-motion";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatedButton, ArrowIcon } from "@/components/ui/button-variants";
import Link from "next/link";
import type { PricingFeature } from "@/data/pricing-plans";

interface PricingCardProps {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  speed: string;
  features: PricingFeature[];
  gradient: string;
  featured?: boolean;
  popularFeatures: string[];
  index: number;
  isInView: boolean;
}

export default function PricingCard({
  slug,
  title,
  subtitle,
  price,
  speed,
  features,
  gradient,
  featured,
  popularFeatures,
  index,
  isInView,
}: PricingCardProps) {
  return (
    <div className={`relative h-full ${featured ? "lg:-my-8" : ""}`}>
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="h-full"
      >
        {/* Card Background with Glass Effect */}
        <div
          className={`absolute inset-0 rounded-3xl transition-all duration-300
                      ${
                        featured
                          ? "bg-white/90 backdrop-blur-sm shadow-2xl shadow-primary/10"
                          : "bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-200/70"
                      }`}
        />

        <div className={`relative ${featured ? "p-8 lg:p-10" : "p-8"}`}>
          {/* Featured Badge */}
          {featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div
                className={`px-4 py-1.5 rounded-full text-sm font-medium
                             bg-gradient-to-r ${gradient} text-white
                             shadow-lg shadow-primary/20`}
              >
                Cel mai popular
              </div>
            </div>
          )}

          {/* Plan Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              className="w-24 h-24 flex items-center justify-center mx-auto mb-6"
            >
              <img
                src="/ALTNET-LOGO.svg"
                alt="ALTNET Logo"
                className={`w-full h-full`}
              />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-500 text-sm font-medium">{subtitle}</p>
          </div>

          {/* Enhanced Price Section */}
          <div className="relative mb-8">
            {/* Price Tag Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 rounded-2xl`}
            />

            <div className="relative p-4 text-center">
              {/* Speed Indicator */}
              <div className="mb-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                              ${
                                featured
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                >
                  Până la {speed}
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-sm text-gray-500">de la</span>
                <span
                  className={`text-5xl font-bold tracking-tight
                              ${featured ? "text-primary" : "text-gray-900"}`}
                >
                  {price}
                </span>
                <span className="text-xl text-gray-500">lei</span>
              </div>

              {/* Period */}
              <span className="text-sm text-gray-500">pe lună, TVA inclus</span>
            </div>
          </div>

          {/* Popular Features Section */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 mb-8">
            <p className="text-xs font-medium text-gray-500 uppercase mb-3">
              Beneficii incluse
            </p>
            <div className="space-y-2">
              {popularFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                  className="flex items-center text-sm text-gray-600"
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient}
                                flex items-center justify-center mr-2 flex-shrink-0`}
                  >
                    <CheckIcon className="w-3 h-3 text-white" />
                  </span>
                  {feature}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <motion.li
                key={feature.text}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className="flex items-start text-sm"
              >
                {feature.included ? (
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5
                                ${featured ? "bg-primary/10" : "bg-gray-100"}`}
                  >
                    <CheckIcon
                      className={`w-3 h-3 ${
                        featured ? "text-primary" : "text-gray-500"
                      }`}
                    />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <XMarkIcon className="w-3 h-3 text-gray-300" />
                  </span>
                )}
                <span
                  className={`
                    ${feature.included ? "text-gray-600" : "text-gray-400"}
                    ${feature.highlight
                      ? "font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md"
                      : ""}
                  `}
                >
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Enhanced Action Button */}
          <Link href={`/pachete/${slug}`}>
            <AnimatedButton
              variant={featured ? "primary" : "outline"}
              className={`w-full ${
                featured ? `bg-gradient-to-r ${gradient}` : ""
              }`}
            >
              {featured ? "Comandă Acum" : "Alege Pachetul"}
              <ArrowIcon direction="right" />
            </AnimatedButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
