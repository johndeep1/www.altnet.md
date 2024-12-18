'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const floatingVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const speedBarVariants = {
  animate: (i: number) => ({
    height: ["16px", "20px", "16px"],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: i * 0.2,
      ease: "easeInOut"
    }
  })
};

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 0a9 9 0 0 0 9-9m-9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
  </svg>
);

const features = [
  {
    name: 'Internet',
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
      </svg>
    )
  },
  {
    name: 'TV',
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: 'Telefonie',
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    name: 'Gaming',
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    )
  }
];

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen -mt-24 pt-24">
      {/* Consistent Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Primary color subtle gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-white/60 to-white/80" />
      </div>

      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={false}
              animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Speed Indicator */}
              <motion.div
                initial={false}
                animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl
                           rounded-2xl border border-primary/10 shadow-lg shadow-primary/5"
              >
                <div className="flex gap-[3px]">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={speedBarVariants}
                      animate="animate"
                      className="w-1 bg-primary rounded-full"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-primary">
                  Până la 1 Gbps
                </span>
              </motion.div>

              {/* Main Content */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold">
                  <span className="text-gray-900">Internet și TV de</span>
                  <motion.span
                    variants={floatingVariants}
                    animate="animate"
                    className="text-primary block mt-2"
                  >
                    Înaltă Viteză
                  </motion.span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl">
                  Conectează-te la viitor cu tehnologia
                  <span className="text-primary font-semibold"> fiber-to-home</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/acoperire">
                  <motion.button
                    initial={false}
                    whileHover={isMounted ? { scale: 1.01, y: -1 } : {}}
                    whileTap={isMounted ? { scale: 0.99 } : {}}
                    className="group relative overflow-hidden bg-primary
                           text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-primary/25 w-full"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full
                                group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative flex items-center justify-center gap-2">
                      Verifică Acoperirea
                      <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-500"
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </motion.button>
                </Link>

                <Link href="/preturi">
                  <motion.button
                    initial={false}
                    whileHover={isMounted ? { scale: 1.01, y: -1 } : {}}
                    whileTap={isMounted ? { scale: 0.99 } : {}}
                    className="group relative overflow-hidden border-2 border-primary text-primary
                           px-8 py-4 rounded-xl font-medium hover:bg-primary hover:text-white
                           transition-all duration-500 w-full"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      Vezi Pachete
                      <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-500"
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Feature Visualization */}
            <motion.div
              initial={false}
              animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-[600px]">
                {/* Central Visualization */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64
                           bg-white/80 backdrop-blur-xl rounded-full border border-primary/10
                           shadow-2xl shadow-primary/20 flex items-center justify-center
                           overflow-hidden"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <div className="relative">
                    <NetworkIcon />
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </div>
                </motion.div>

                {/* Orbiting Features */}
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.name}
                    className="absolute w-32 h-32 bg-white/80 backdrop-blur-xl rounded-2xl
                             shadow-lg shadow-primary/5 border border-primary/10
                             flex flex-col items-center justify-center gap-3"
                    style={{
                      top: `${50 + Math.sin(i * (Math.PI / 2)) * 40}%`,
                      left: `${50 + Math.cos(i * (Math.PI / 2)) * 40}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span className="text-gray-800 font-medium">{feature.name}</span>
                  </motion.div>
                ))}

                {/* Connecting Lines */}
                {isMounted && features.map((_, i) => (
                  <svg key={i} className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                    <motion.path
                      d={`M ${320 + Math.cos(i * (Math.PI / 2)) * 128},${300 + Math.sin(i * (Math.PI / 2)) * 128} L 320,300`}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </svg>
                ))}

                {/* Gradient Definitions */}
                <svg className="absolute inset-0" style={{ zIndex: -2 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(79, 70, 229, 0.1)" />
                      <stop offset="50%" stopColor="rgba(79, 70, 229, 0.3)" />
                      <stop offset="100%" stopColor="rgba(79, 70, 229, 0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Create a reusable background component
export function ConsistentBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Primary color subtle gradient orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-white/60 to-white/80" />
    </div>
  );
}
