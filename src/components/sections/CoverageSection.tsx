'use client';

import { motion } from 'framer-motion';
import { ConsistentBackground } from './HeroSection';

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
  { left: '60%', top: '80%' },
  { left: '70%', top: '65%' },
  { left: '80%', top: '75%' },
  { left: '90%', top: '85%' },
  { left: '25%', top: '90%' },
  { left: '35%', top: '95%' },
  { left: '45%', top: '80%' },
  { left: '55%', top: '85%' },
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
        </div>
      </div>
    </section>
  );
}
