"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedButton, ArrowIcon } from "@/components/ui/button-variants";

const features = [
  {
    title: "Fibră Optică",
    description:
      "Infrastructură modernă de fibră optică pentru viteze ultra-rapide și stabilitate maximă.",
    icon: (
      <img
        src="/altnet-related/ALTNET-INTERNET.svg"
        alt="Fibră Optică"
        className="w-6 h-6"
      />
    ),
  },
  {
    title: "Acoperire Extinsă",
    description:
      "Rețea dezvoltată în continuu pentru a acoperi cât mai multe zone din Ialoveni.",
    icon: (
      <img
        src="/altnet-related/ALTNET-WIFI.svg"
        alt="Acoperire Extinsă"
        className="w-6 h-6"
      />
    ),
  },
  {
    title: "Suport 24/7",
    description:
      "Echipă tehnică disponibilă non-stop pentru asistență și mentenanță.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Instalare Rapidă",
    description:
      "Proces de instalare rapid și profesionist, cu timp minim de așteptare.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const stats = [
  { value: "1000", label: "Mbps Viteză", suffix: "+" },
  { value: "99.9", label: "Uptime", suffix: "%" },
  { value: "24/7", label: "Suport Tehnic", suffix: "" },
  { value: "15", label: "Ani Experiență", suffix: "+" },
];

const benefits = [
  "Gaming online fără latență",
  "Streaming 4K fără întreruperi",
  "Video conferințe HD stabile",
  "Download și upload ultra-rapid",
  "Acces simultan pentru multiple dispozitive",
  "Securitate avansată a rețelei",
];

const particlePositions = [
  { x: 15, y: 20 },
  { x: 25, y: 45 },
  { x: 35, y: 15 },
  { x: 45, y: 35 },
  { x: 55, y: 25 },
  { x: 65, y: 55 },
  { x: 75, y: 30 },
  { x: 85, y: 45 },
  { x: 20, y: 65 },
  { x: 30, y: 75 },
  { x: 40, y: 85 },
  { x: 50, y: 70 },
];

export default function InternetPage() {
  const router = useRouter();
  const containerRef = useRef(null);

  // Navigation functions
  const handleAvailabilityCheck = () => {
    router.push("/acoperire");
  };

  const handleContact = () => {
    router.push("/contact");
  };

  const handleRequestOffer = () => {
    router.push("/contact?type=offer");
  };

  return (
    <main ref={containerRef} className="min-h-screen relative">
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
                Internet prin <span className="text-primary">Fibră Optică</span>
              </h1>
              <p className="text-xl text-gray-600">
                Experimentează viteza și stabilitatea internetului de ultimă
                generație, cu tehnologie avansată și performanță garantată.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="relative py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              De Ce Să Alegi Altnet?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferim servicii de internet de înaltă calitate, cu focus pe
              performanță și satisfacția clienților
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Speed Comparison Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-gray-900">
                    Viteză <span className="text-primary">Excepțională</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Experimentează viteze de download și upload care îți permit
                    să:
                  </p>
                </motion.div>

                {/* Speed Comparisons */}
                <div className="space-y-6">
                  {[
                    { title: "Film 4K (50GB)", time: "7 minute" },
                    { title: "Album Muzică (100MB)", time: "1 secundă" },
                    { title: "Joc Modern (100GB)", time: "14 minute" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-900">
                            {item.title}
                          </span>
                          <span className="text-primary font-bold">
                            {item.time}
                          </span>
                        </div>
                        <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Speed Visualization */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 p-8">
                    <div className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgba(79, 70, 229, 0.2)"
                              />
                              <stop
                                offset="100%"
                                stopColor="rgba(59, 130, 246, 0.2)"
                              />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            fill="none"
                          />
                        </svg>
                      </motion.div>
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="mb-2"
                        >
                          <img
                            src="/altnet-related/ALTNET-WIFI.svg"
                            alt="High-Speed Internet"
                            className="w-12 h-12 mx-auto"
                          />
                        </motion.div>
                        <span className="text-5xl font-bold text-primary">
                          1000
                        </span>
                        <span className="block text-gray-600 mt-2">Mbps</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pregătit pentru Internet Ultra-Rapid?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactează-ne acum pentru a beneficia de cele mai bune oferte și
              servicii de internet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acoperire">
                <AnimatedButton variant="primary" className="w-full sm:w-auto">
                  Verifică Disponibilitatea
                  <ArrowIcon direction="forward" />
                </AnimatedButton>
              </Link>
              <Link href="/contact">
                <AnimatedButton variant="outline" className="w-full sm:w-auto">
                  Contactează-ne
                  <ArrowIcon direction="right" />
                </AnimatedButton>
              </Link>
              <Link href="/contact?type=offer">
                <AnimatedButton
                  variant="outline"
                  className="w-full sm:w-auto bg-primary/5"
                >
                  Solicită o Ofertă
                  <ArrowIcon direction="right" />
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
