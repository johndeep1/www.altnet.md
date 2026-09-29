'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PricingCards from '../pricing/PricingCards';
import type { PricingPlan } from '@/data/pricing-plans';
import { ConsistentBackground } from './HeroSection';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PricingSectionProps {
  residentialPlans?: PricingPlan[];
  businessPlans?: PricingPlan[];
  residentialLabel?: string;
  businessLabel?: string;
}

const WINDOW_SIZE = 3;

export default function PricingSection({
  residentialPlans = [],
  businessPlans = [],
  residentialLabel = 'Persoane fizice',
  businessLabel = 'Persoane juridice',
}: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [activeTab, setActiveTab] = useState<'residential' | 'business'>('residential');
  const [startIndex, setStartIndex] = useState(0);

  const activePlans = activeTab === 'residential' ? residentialPlans : businessPlans;
  const maxStart = Math.max(0, activePlans.length - WINDOW_SIZE);

  useEffect(() => {
    setStartIndex(0);
  }, [activeTab]);

  const visiblePlans = useMemo(() => {
    if (activePlans.length <= WINDOW_SIZE) return activePlans;
    return activePlans.slice(startIndex, startIndex + WINDOW_SIZE);
  }, [activePlans, startIndex]);

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex < maxStart;

  return (
    <section className="relative overflow-hidden pb-16" ref={ref}>
      <ConsistentBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            Alege pachetul potrivit pentru tine sau afacerea ta
          </p>
        </motion.div>

        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center p-1.5 bg-gray-100 rounded-full border border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('residential')}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'residential'
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
              aria-pressed={activeTab === 'residential'}
            >
              {residentialLabel}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
              aria-pressed={activeTab === 'business'}
            >
              {businessLabel}
            </button>
          </div>
        </div>

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

        <motion.div style={{ y }}>
          <PricingCards plans={visiblePlans} />
        </motion.div>

        {activePlans.length > WINDOW_SIZE && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setStartIndex((value) => Math.max(0, value - 1))}
              disabled={!canGoBack}
              aria-label="Oferta precedentă"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2" aria-label="Poziție oferte">
              {Array.from({ length: maxStart + 1 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStartIndex(index)}
                  aria-label={`Setul ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === startIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStartIndex((value) => Math.min(maxStart, value + 1))}
              disabled={!canGoForward}
              aria-label="Oferta următoare"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            <span className="text-primary hover:underline cursor-pointer">
              Vezi termenii și condițiile
            </span>
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
    </section>
  );
}
