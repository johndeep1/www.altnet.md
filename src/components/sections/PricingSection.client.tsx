'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import PricingCards from '../pricing/PricingCards';
import type { PricingPlan } from '@/data/pricing-plans';
import { defaultPlans } from '@/data/pricing-plans';
import { ConsistentBackground } from './HeroSection';
import {
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface PricingSectionProps {
  popularPlans?: PricingPlan[];
  promoPlans?: PricingPlan[];
  popularLabel?: string;
  promoLabel?: string;
}

export default function PricingSection({
  popularPlans = [],
  promoPlans = [],
  popularLabel = "Pachete populare",
  promoLabel = "Produs 1 leu",
}: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [activeTab, setActiveTab] = useState<"popular" | "promo">("popular");

  const pricingPlans = useMemo(() => {
    const primary = activeTab === "popular" ? popularPlans : promoPlans;
    const secondary = activeTab === "popular" ? promoPlans : popularPlans;
    const result: PricingPlan[] = [];
    const seen = new Set<string>();

    const addPlans = (source: PricingPlan[]) => {
      source.forEach((plan) => {
        if (result.length >= 3) return;
        const key = plan.id ?? plan.slug;
        if (key && seen.has(String(key))) return;
        if (key) {
          seen.add(String(key));
        }
        result.push(plan);
      });
    };

    addPlans(primary);
    addPlans(secondary);

    if (result.length < 3) {
      addPlans(defaultPlans);
    }

    return result.slice(0, 3);
  }, [activeTab, popularPlans, promoPlans]);

  return (
    <section className="relative overflow-hidden pb-16" ref={ref}>
      {/* Consistent Background */}
      <ConsistentBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            <span className="block mb-2">Pachete și</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
              Prețuri Accesibile
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Alege pachetul perfect pentru tine cu servicii de calitate la prețuri competitive
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("popular")}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              activeTab === "popular"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
            aria-pressed={activeTab === "popular"}
          >
            {popularLabel}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("promo")}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              activeTab === "promo"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
            aria-pressed={activeTab === "promo"}
          >
            {promoLabel}
          </button>
        </div>

        {/* Popular Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50"
        >
          <div className="flex items-center justify-center flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">Fără costuri ascunse</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">Instalare rapidă</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">Suport 24/7</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div style={{ y }}>
          <PricingCards plans={pricingPlans} />
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            Toate prețurile includ TVA. Contractul minim este de 24 luni.
            <br />
            <span className="text-primary hover:underline cursor-pointer">
              Vezi termenii și condițiile
            </span>
          </p>
        </motion.div>
      </div>

      {/* Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
    </section>
  );
}
