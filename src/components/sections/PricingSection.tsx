'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PricingCard from '../pricing/PricingCard';
import {
  BoltIcon, RocketLaunchIcon, SparklesIcon,
  ArrowTrendingUpIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';

const pricingPlans = [
  {
    title: "Start",
    subtitle: "Pentru început",
    price: 49,
    speed: "300 Mbps",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    icon: <BoltIcon className="w-6 h-6" />,
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital", included: false },
      { text: "Telefonie fixă", included: false },
    ],
    popularFeatures: ["Viteză garantată", "Asistență 24/7"],
  },
  {
    title: "Popular",
    subtitle: "Cel mai ales",
    price: 79,
    speed: "500 Mbps",
    gradient: "from-primary via-primary-dark to-violet-600",
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital HD", included: true },
      { text: "Telefonie fixă", included: false },
    ],
    popularFeatures: ["TV pe mobil inclus", "Gaming optimizat"],
    featured: true,
  },
  {
    title: "Premium",
    subtitle: "Pentru pretențioși",
    price: 99,
    speed: "1000 Mbps",
    gradient: "from-violet-500 via-purple-600 to-purple-700",
    icon: <SparklesIcon className="w-6 h-6" />,
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6E", included: true },
      { text: "Instalare prioritară", included: true },
      { text: "TV Digital 4K", included: true },
      { text: "Telefonie fixă nelimitată", included: true },
    ],
    popularFeatures: ["Suport prioritar", "Smart Home Ready"],
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="py-32 relative overflow-hidden bg-gray-50" ref={ref}>
      {/* Modern Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute w-[1000px] h-[1000px] -right-96 -top-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -left-80 top-32 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Prețuri competitive
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="block mb-2">Alege Planul Potrivit</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-violet-600">
              Pentru Nevoile Tale
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pachete complete de servicii, create pentru experiența digitală perfectă
          </p>
        </motion.div>

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

        {/* Pricing Cards Grid */}
        <motion.div
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <PricingCard
                {...plan}
                index={index}
                isInView={isInView}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            Toate prețurile includ TVA. Contractul minim este de 12 luni.
            <br />
            <span className="text-primary hover:underline cursor-pointer">
              Vezi termenii și condițiile
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
