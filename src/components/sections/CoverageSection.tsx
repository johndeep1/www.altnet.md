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
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <location.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {location.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{location.coverage}</p>
                    {location.hasOffice && (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Building2 className="w-4 h-4" />
                        <span>{location.officeCount} oficiu disponibil</span>
                      </div>
                    )}
                  </div>
                </div>
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
