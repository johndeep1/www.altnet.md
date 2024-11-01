'use client';

import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          Serviciile Noastre
        </motion.h1>
      </div>
    </main>
  );
}
