"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PricingCard from "./PricingCard";

export interface PricingPlan {
  title: string;
  subtitle: string;
  price: number;
  speed: string;
  gradient: string;
  features: Array<{ text: string; included: boolean }>;
  popularFeatures: string[];
  featured?: boolean;
}

interface PricingCardsProps {
  plans?: PricingPlan[];
  className?: string;
}

export const defaultPlans: PricingPlan[] = [
  {
    title: "Start",
    subtitle: "Pentru început",
    price: 120,
    speed: "300 Mbps",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital", included: false },
    ],
    popularFeatures: ["Viteză garantată", "Asistență 24/7"],
  },
  {
    title: "Popular",
    subtitle: "Cel mai ales",
    price: 150,
    speed: "500 Mbps",
    gradient: "from-primary via-primary-dark to-violet-600",
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital HD", included: true },
    ],
    popularFeatures: ["TV pe mobil inclus", "Gaming optimizat"],
    featured: true,
  },
  {
    title: "Premium",
    subtitle: "Pentru pretențioși",
    price: 200,
    speed: "1000 Mbps",
    gradient: "from-violet-500 via-purple-600 to-purple-700",
    features: [
      { text: "Internet Gigabit", included: true },
      { text: "Router WiFi 6E", included: true },
      { text: "Instalare prioritară", included: true },
      { text: "TV Digital 4K", included: true },
    ],
    popularFeatures: ["IP Static inclus", "SLA garantat"],
  },
];

export default function PricingCards({
  plans = defaultPlans,
  className = "",
}: PricingCardsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={className}>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <PricingCard {...plan} index={index} isInView={isInView} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
