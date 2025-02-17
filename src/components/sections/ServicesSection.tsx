'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ServiceCard from '../services/ServiceCard';
import { ConsistentBackground } from './HeroSection';
import {
  WifiIcon, TvIcon, PhoneIcon, RocketLaunchIcon,
  ShieldCheckIcon, DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    title: "Internet Fibră Optică",
    description: "Conectivitate de ultimă generație cu viteze de până la 1Gbps",
    icon: <WifiIcon className="w-8 h-8" />,
    gradient: "from-primary to-primary-dark",
    features: ["Până la 1Gbps", "Latență < 5ms", "Router WiFi 6"],
  },
  {
    title: "TV Digital 4K",
    description: "Experiență vizuală premium cu conținut 4K și funcții smart",
    icon: <TvIcon className="w-8 h-8" />,
    gradient: "from-blue-500 to-indigo-500",
    features: ["150+ canale HD", "4K disponibil", "Smart TV Apps"],
  },
  {
    title: "Securitate Avansată",
    description: "Protecție completă pentru toate dispozitivele tale",
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    gradient: "from-amber-500 to-orange-500",
    features: ["Firewall", "Control Parental", "VPN inclus"],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Consistent Background */}
      <ConsistentBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-8 bg-primary/60" />
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Servicii Premium
            </span>
            <span className="h-px w-8 bg-primary/60" />
          </motion.div>

          <motion.div
            style={{ scale }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              <span className="block mb-2">Conectivitate de</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
                Nouă Generație
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Descoperă serviciile noastre premium, proiectate pentru viitorul digital
            </p>
          </motion.div>
        </motion.div>

        {/* Updated Grid Layout for 6 Cards */}
        <motion.div
          style={{ scale }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <ServiceCard
                {...service}
                index={index}
                isInView={isInView}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 text-gray-500 text-sm">
            <span className="h-px w-12 bg-gray-200" />
            <span>Tehnologie de ultimă generație</span>
            <span className="h-px w-12 bg-gray-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
