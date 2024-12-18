'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

const features = [
  {
    title: 'Fibră Optică',
    description: 'Infrastructură modernă de fibră optică pentru viteze ultra-rapide și stabilitate maximă.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Acoperire Extinsă',
    description: 'Rețea dezvoltată în continuu pentru a acoperi cât mai multe zone din Ialoveni.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Suport 24/7',
    description: 'Echipă tehnică disponibilă non-stop pentru asistență și mentenanță.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: 'Instalare Rapidă',
    description: 'Proces de instalare rapid și profesionist, cu timp minim de așteptare.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const stats = [
  { value: '1000', label: 'Mbps Viteză', suffix: '+' },
  { value: '99.9', label: 'Uptime', suffix: '%' },
  { value: '24/7', label: 'Suport Tehnic', suffix: '' },
  { value: '15', label: 'Ani Experiență', suffix: '+' }
];

const benefits = [
  'Gaming online fără latență',
  'Streaming 4K fără întreruperi',
  'Video conferințe HD stabile',
  'Download și upload ultra-rapid',
  'Acces simultan pentru multiple dispozitive',
  'Securitate avansată a rețelei'
];

const particlePositions = [
  { x: 15, y: 20 }, { x: 25, y: 45 }, { x: 35, y: 15 },
  { x: 45, y: 35 }, { x: 55, y: 25 }, { x: 65, y: 55 },
  { x: 75, y: 30 }, { x: 85, y: 45 }, { x: 20, y: 65 },
  { x: 30, y: 75 }, { x: 40, y: 85 }, { x: 50, y: 70 }
];

export default function InternetPage() {
  const router = useRouter();
  const containerRef = useRef(null);

  // Navigation functions
  const handleAvailabilityCheck = () => {
    router.push('/acoperire');
  };

  const handleContact = () => {
    router.push('/contact');
  };

  const handleRequestOffer = () => {
    router.push('/contact?type=offer');
  };

  return (
    <main ref={containerRef} className="min-h-screen relative">
      {/* Consistent Background */}
      {/* <ConsistentBackground /> */}

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Floating Particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [-20, 0, -20],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Internet prin{' '}
                <span className="text-primary">Fibră Optică</span>
              </h1>
              <p className="text-xl text-gray-600">
                Experimentează viteza și stabilitatea internetului de ultimă generație,
                cu tehnologie avansată și performanță garantată.
              </p>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <svg
                className="w-full h-auto"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Central Router */}
                <motion.rect
                  x="160"
                  y="160"
                  width="80"
                  height="80"
                  rx="10"
                  className="fill-primary/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Connection Lines */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Vertical Lines */}
                  <motion.line
                    x1="200"
                    y1="80"
                    x2="200"
                    y2="160"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.line
                    x1="200"
                    y1="240"
                    x2="200"
                    y2="320"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />

                  {/* Horizontal Lines */}
                  <motion.line
                    x1="80"
                    y1="200"
                    x2="160"
                    y2="200"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.line
                    x1="240"
                    y1="200"
                    x2="320"
                    y2="200"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </motion.g>

                {/* Connection Points */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <circle cx="200" cy="80" r="8" className="fill-primary" />
                  <circle cx="200" cy="320" r="8" className="fill-primary" />
                  <circle cx="80" cy="200" r="8" className="fill-primary" />
                  <circle cx="320" cy="200" r="8" className="fill-primary" />
                </motion.g>

                {/* Wireless Signals */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path
                    d="M160 160 Q 200 120 240 160"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary/20"
                  />
                  <path
                    d="M140 140 Q 200 80 260 140"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary/10"
                  />
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Stats Section */}
      <section className="relative py-16">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Features Grid */}
      <section className="relative py-16">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Oferim servicii de internet de înaltă calitate, cu focus pe performanță și satisfacția clienților
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
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Benefits Section */}
      <section className="relative py-16">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Beneficii Pentru Tine
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Network Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <svg
                className="w-full h-auto"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main Router */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M200 150 L100 100 L300 100 L200 150"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />

                {/* Connection Lines */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <path
                    d="M200 150 L150 200 M200 150 L250 200"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="text-gray-400"
                  />
                </motion.g>

                {/* Devices */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <circle cx="150" cy="200" r="20" className="fill-primary/20" />
                  <circle cx="250" cy="200" r="20" className="fill-primary/20" />
                  <circle cx="200" cy="150" r="25" className="fill-primary/30" />
                </motion.g>

                {/* Wireless Signals */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path
                    d="M200 120 Q150 100 100 120 M200 120 Q250 100 300 120"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/50"
                  />
                  <path
                    d="M200 110 Q150 80 80 110 M200 110 Q250 80 320 110"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                  />
                </motion.g>

                {/* Connection Points */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <circle cx="100" cy="100" r="8" className="fill-primary" />
                  <circle cx="300" cy="100" r="8" className="fill-primary" />
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pregătit pentru Internet Ultra-Rapid?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactează-ne acum pentru a beneficia de cele mai bune oferte și servicii de internet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAvailabilityCheck}
                className="px-8 py-4 bg-primary text-white rounded-xl font-medium
                       shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Verifică Disponibilitatea
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="px-8 py-4 bg-white/60 backdrop-blur-sm text-gray-900 rounded-xl font-medium
                       border border-gray-200/50 hover:bg-white/80 transition-colors"
              >
                Contactează-ne
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRequestOffer}
                className="px-8 py-4 bg-primary/10 text-primary rounded-xl font-medium
                       hover:bg-primary/20 transition-colors"
              >
                Solicită o Ofertă
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Speed Comparison Section */}
      <section className="relative py-24">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    Experimentează viteze de download și upload care îți permit să:
                  </p>
                </motion.div>

                {/* Speed Comparisons */}
                <div className="space-y-6">
                  {[
                    { title: 'Film 4K (50GB)', time: '7 minute' },
                    { title: 'Album Muzică (100MB)', time: '1 secundă' },
                    { title: 'Joc Modern (100GB)', time: '14 minute' }
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
                          <span className="text-lg font-medium text-gray-900">{item.title}</span>
                          <span className="text-primary font-bold">{item.time}</span>
                        </div>
                        <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
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
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
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
                        <span className="text-5xl font-bold text-primary">1000</span>
                        <span className="block text-gray-600 mt-2">Mbps</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>
    </main>
  );
}
