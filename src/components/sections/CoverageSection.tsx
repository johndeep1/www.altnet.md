'use client';

import { motion } from 'framer-motion';

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
    <section className="relative py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/80"></div>

        {/* Animated Gradient Orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 w-96 h-96 bg-gradient-to-r from-primary/20 to-primary/5
                   rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-32 top-1/4 w-96 h-96 bg-gradient-to-l from-primary/20 to-primary/5
                   rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-1/4 bottom-0 w-96 h-96 bg-gradient-to-t from-primary/20 to-primary/5
                   rounded-full blur-3xl"
        ></motion.div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>

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

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-gradient"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-medium">Verifică Disponibilitatea</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              Acoperire Internet
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Contactați-ne pentru a verifica disponibilitatea serviciilor noastre în zona dvs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
