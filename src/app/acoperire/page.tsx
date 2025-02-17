"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Building2 } from "lucide-react";
import Link from "next/link";

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

export default function CoveragePage() {
  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-32 h-32 mb-6 relative"
            >
              <img
                src="/ALTNET-LOGO.svg"
                alt="ALTNET Logo"
                className="w-full h-full object-contain"
              />
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Zonă de <span className="text-primary">Acoperire</span>
              </h1>
              <p className="text-xl text-gray-600">
                Descoperă unde sunt disponibile serviciile noastre de internet prin fibră optică
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Grid */}
      <section className="relative py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vrei să te conectezi la rețeaua noastră?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru a verifica disponibilitatea serviciului la adresa ta și pentru a afla mai multe detalii.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contactează-ne
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
