"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PricingCard from "./PricingCard";
import type { PricingPlan } from "@/data/pricing-plans";
import { defaultPlans } from "@/data/pricing-plans";

interface PricingCardsProps {
  plans?: PricingPlan[];
  className?: string;
}

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
            key={plan.id ?? plan.slug}
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
