"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedButton, ArrowIcon } from "@/components/ui/button-variants";

const floatingVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const speedBarVariants = {
  animate: (i: number) => ({
    height: ["16px", "20px", "16px"],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: i * 0.2,
      ease: "easeInOut",
    },
  }),
};

const NetworkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-16 h-16 text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 0a9 9 0 0 0 9-9m-9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"
    />
  </svg>
);

const features = [
  {
    name: "Internet",
    icon: "/altnet-related/ALTNET-INTERNET.svg",
  },
  {
    name: "TV",
    icon: "/altnet-related/ALTNET-TV.svg",
  },
  {
    name: "Telefonie",
    icon: "/altnet-related/ALTNET-TELEFON.svg",
  },
  {
    name: "Gaming",
    icon: "/altnet-related/ALTNET-WIFI.svg",
  },
];

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen -mt-24 pt-28 sm:pt-48">
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
              animate={
                isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Speed Indicator */}
              <motion.div
                initial={false}
                animate={
                  isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
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
                  <span className="text-primary font-semibold">
                    {" "}
                    fiber-to-home
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/acoperire">
                  <AnimatedButton variant="primary" isMounted={isMounted}>
                    Verifică Acoperirea
                    <ArrowIcon direction="forward" />
                  </AnimatedButton>
                </Link>

                <Link href="/preturi">
                  <AnimatedButton variant="outline" isMounted={isMounted}>
                    Vezi Pachete
                    <ArrowIcon direction="right" />
                  </AnimatedButton>
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
              <div className="relative w-full h-[600px] user-select-none">
                {/* Central Visualization */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64
                           bg-white/80 backdrop-blur-xl rounded-full border border-primary/10
                           shadow-2xl shadow-primary/20 flex items-center justify-center
                           overflow-hidden user-select-none"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <div className="relative w-40 h-40">
                    <img
                      src="/ALTNET-LOGO.svg"
                      alt="ALTNET Logo"
                      className="w-full h-full object-contain"
                    />
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
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
                      transform: "translate(-50%, -50%)",
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
                      {typeof feature.icon === "string" ? (
                        <img
                          src={feature.icon}
                          alt={feature.name}
                          className="w-6 h-6"
                        />
                      ) : (
                        feature.icon
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {feature.name}
                    </span>
                  </motion.div>
                ))}

                {/* Connecting Lines */}
                {isMounted &&
                  features.map((_, i) => (
                    <svg
                      key={i}
                      className="absolute inset-0 w-full h-full"
                      style={{ zIndex: -1 }}
                    >
                      <motion.path
                        d={`M ${320 + Math.cos(i * (Math.PI / 2)) * 128},${
                          300 + Math.sin(i * (Math.PI / 2)) * 128
                        } L 320,300`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    </svg>
                  ))}

                {/* Gradient Definitions */}
                <svg className="absolute inset-0" style={{ zIndex: -2 }}>
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
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
