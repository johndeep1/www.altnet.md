'use client';

import { motion } from 'framer-motion';
import { ConsistentBackground } from './HeroSection';
import { MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

// Predefined positions for particles
const PARTICLE_POSITIONS = [
  { left: '15%', top: '20%' },
  { left: '25%', top: '45%' },
  { left: '35%', top: '15%' },
  { left: '45%', top: '35%' },
  { left: '55%', top: '25%' },
  { left: '65%', top: '55%' },
  { left: '75%', top: '30%' },
  { left: '85%', top: '45%' },
  { left: '20%', top: '65%' },
  { left: '30%', top: '75%' },
  { left: '40%', top: '85%' },
  { left: '50%', top: '70%' },
];

const locations = [
  {
    name: "Orașul Ialoveni",
    type: "city",
    hasOffice: true,
    officeCount: 1,
    coverage: "Acoperire completă",
    icon: Building2,
  },
  {
    name: "Satul Costești",
    type: "village",
    hasOffice: true,
    officeCount: 1,
    coverage: "Acoperire completă",
    icon: Building2,
  },
  {
    name: "Satul Dănceni",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
  },
  {
    name: "Satul Nimoreni",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
  },
  {
    name: "Satul Sociteni",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
    },
    {
    name: "Satul Suruceni",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
    },
        {
    name: "Satul Hansca",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
    },
    {
    name: "Satul Pojăreni",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
  },
    {
    name: "Satul Malcoci",
    type: "village",
    hasOffice: false,
    coverage: "Acoperire completă",
    icon: MapPin,
  },
];

export default function CoverageSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Consistent Background */}
      <ConsistentBackground />

      {/* Top Transition Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

      {/* Main Content Container with Padding */}
      <div className="pt-32 pb-20">
        {/* Floating Particles */}
        {PARTICLE_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={position}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                <span className="block mb-2">Acoperire în</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
                  Toată Regiunea
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                Verifică disponibilitatea serviciilor noastre în zona ta
              </p>
            </motion.div>
          </div>

          {/* Coverage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/50 overflow-hidden"
              >
                {/* Decorative gradient backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Decorative dots */}
                <div className="absolute top-0 right-0 h-20 w-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary rounded-full" />
                  <div className="absolute top-4 right-8 w-1 h-1 bg-primary rounded-full" />
                  <div className="absolute top-8 right-4 w-1 h-1 bg-primary rounded-full" />
                </div>

                <div className="relative flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center text-primary z-10"
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <location.icon className="w-6 h-6" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {location.name}
                    </h3>

                    <div className="relative">
                      <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm mb-4">
                        {location.coverage}
                      </span>
                    </div>

                    {location.hasOffice ? (
                      <motion.div
                        initial={{ opacity: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-sm text-primary bg-primary/5 px-3 py-1.5 rounded-lg w-fit"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>{location.officeCount} oficiu disponibil</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg w-fit"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Acoperire completă</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Bottom gradient decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/acoperire"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              Vezi Toate Locațiile
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
