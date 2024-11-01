'use client';

import { motion } from 'framer-motion';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function AcoperirePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center
                     mx-auto mb-8 text-primary"
          >
            <WrenchScrewdriverIcon className="w-12 h-12" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pagină în Construcție
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lucrăm la actualizarea hărții de acoperire.
            Reveniți în curând pentru a vedea zonele de acoperire ale serviciilor noastre.
          </p>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-primary text-white rounded-xl font-medium
                     shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            Înapoi la Pagina Principală
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
