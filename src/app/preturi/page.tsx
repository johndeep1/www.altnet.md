'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import PricingCard from '@/components/pricing/PricingCard';
import { BoltIcon, RocketLaunchIcon, SparklesIcon, CheckIcon } from '@heroicons/react/24/outline';

const pricingPlans = [
  {
    title: "Start",
    subtitle: "Pentru început",
    price: 299,
    speed: "300 Mbps",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    icon: <BoltIcon className="w-6 h-6" />,
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital", included: false },
      { text: "Telefonie fixă", included: false },
    ],
    popularFeatures: ["Viteză garantată", "Asistență 24/7"],
  },
  {
    title: "Popular",
    subtitle: "Cel mai ales",
    price: 399,
    speed: "500 Mbps",
    gradient: "from-primary via-primary-dark to-violet-600",
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital HD", included: true },
      { text: "Telefonie fixă", included: true },
    ],
    popularFeatures: ["TV pe mobil inclus", "Gaming optimizat"],
    featured: true,
  },
  {
    title: "Pro",
    subtitle: "Pentru pretențioși",
    price: 499,
    speed: "1000 Mbps",
    gradient: "from-violet-500 via-purple-600 to-purple-700",
    icon: <SparklesIcon className="w-6 h-6" />,
    features: [
      { text: "Internet Gigabit", included: true },
      { text: "Router WiFi 6E", included: true },
      { text: "Instalare prioritară", included: true },
      { text: "TV 4K", included: true },
      { text: "Telefonie internațională", included: true },
    ],
    popularFeatures: ["IP Static inclus", "SLA garantat"],
  }
];

const comparisonFeatures = [
  {
    category: 'Internet',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    features: [
      { name: 'Viteză Download', start: '300 Mbps', popular: '500 Mbps', pro: '1000 Mbps' },
      { name: 'Viteză Upload', start: '300 Mbps', popular: '500 Mbps', pro: '1000 Mbps' },
      { name: 'Router WiFi', start: 'WiFi 6', popular: 'WiFi 6', pro: 'WiFi 6E' },
      { name: 'IP Static', start: false, popular: true, pro: true },
      { name: 'IPv6', start: true, popular: true, pro: true },
      { name: 'Instalare', start: 'Gratuită', popular: 'Gratuită', pro: 'Prioritară' },
    ]
  },
  {
    category: 'TV Digital',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      { name: 'Canale TV', start: '60+', popular: '120+', pro: '160+' },
      { name: 'Canale HD', start: '20+', popular: '50+', pro: '70+' },
      { name: 'TV pe mobil', start: false, popular: true, pro: true },
      { name: 'Canale 4K', start: false, popular: '2', pro: '5+' },
      { name: 'Înregistrări Cloud', start: false, popular: '50 ore', pro: '100 ore' },
      { name: 'Multi-screen', start: '1 device', popular: '2 devices', pro: '4 devices' },
    ]
  },
  {
    category: 'Telefonie',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    features: [
      { name: 'Minute în rețea', start: 'Nelimitat', popular: 'Nelimitat', pro: 'Nelimitat' },
      { name: 'Minute naționale', start: '100', popular: 'Nelimitat', pro: 'Nelimitat' },
      { name: 'Minute internaționale', start: false, popular: '100', pro: 'Nelimitat' },
      { name: 'Numere adiționale', start: false, popular: '1', pro: '2' },
      { name: 'Apeluri HD', start: false, popular: true, pro: true },
      { name: 'Robotul Telefonic', start: false, popular: true, pro: true },
    ]
  }
];

export default function PricingPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  return (
    <main ref={containerRef} className="min-h-screen pt-32 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
            opacity: useTransform(scrollYProgress, [0, 1], [1, 0])
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section with 3D Element */}
      <section className="relative mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Pachete și <span className="text-primary">Prețuri</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Alege pachetul perfect pentru tine cu servicii de calitate la prețuri competitive
              </p>
              <div className="flex flex-wrap gap-4">
                {['Internet', 'TV', 'Telefonie'].map((service) => (
                  <motion.div
                    key={service}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100
                             flex items-center gap-2 text-gray-600 hover:text-primary
                             hover:border-primary/20 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3D Network Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square relative">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Add animated network visualization */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Connection Lines */}
                    <motion.path
                      d="M200 100 L100 200 L200 300 L300 200 Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-primary/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />

                    {/* Connection Points */}
                    {[
                      [200, 100], [100, 200],
                      [200, 300], [300, 200]
                    ].map(([cx, cy], i) => (
                      <motion.circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="8"
                        className="fill-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                      />
                    ))}
                  </motion.g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...plan} index={index} isInView={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compară Pachetele
            </h2>
            <p className="text-gray-600">
              Vezi toate detaliile și alege pachetul potrivit pentru tine
            </p>
          </motion.div>

          {/* Added responsive container */}
          <div className="mt-8">
            {/* Desktop Version */}
            <div className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-6 px-6 text-left text-gray-500 font-medium w-1/4">
                      <span className="sr-only">Caracteristici</span>
                    </th>
                    {[
                      { name: 'Start', price: '299' },
                      { name: 'Popular', price: '399', recommended: true },
                      { name: 'Pro', price: '499' }
                    ].map((plan) => (
                      <th
                        key={plan.name}
                        className={`py-6 px-6 text-center w-1/4 relative
                          ${plan.recommended ? 'text-primary' : 'text-gray-900'}`}
                      >
                        {plan.recommended && (
                          <div className="absolute -top-3 left-0 right-0">
                            <span className="px-4 py-1.5 bg-primary text-white text-sm
                                         font-medium rounded-full inline-block">
                              Recomandat
                            </span>
                          </div>
                        )}
                        <div className="font-bold text-lg mb-2 mt-4">
                          {plan.name}
                        </div>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className={`text-2xl font-bold
                            ${plan.recommended ? 'text-primary' : 'text-gray-900'}`}>
                            {plan.price}
                          </span>
                          <span className="text-gray-500 text-sm">MDL/lună</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((section, sectionIndex) => [
                    <tr key={`section-${section.category}`} className="border-t border-gray-100">
                      <td
                        colSpan={4}
                        className="py-4 px-6 text-left text-gray-900 font-semibold
                                 bg-gray-50/80 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-primary">{section.icon}</div>
                          {section.category}
                        </div>
                      </td>
                    </tr>,
                    ...section.features.map((feature, featureIndex) => (
                      <motion.tr
                        key={`feature-${section.category}-${feature.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (sectionIndex * 0.1) + (featureIndex * 0.05) }}
                        className="border-t border-gray-100 hover:bg-gray-50/50"
                      >
                        <td className="py-4 px-6 text-left text-gray-600">
                          {feature.name}
                        </td>
                       {(['start', 'popular', 'pro'] as const).map((plan) => (
                          <td key={plan} className="py-4 px-6 text-center">
                            {typeof feature[plan] === 'boolean' ? (
                              feature[plan] ? (
                                <CheckIcon className="w-5 h-5 text-primary mx-auto" />
                              ) : (
                                <span className="block w-5 h-0.5 bg-gray-300 mx-auto rounded-full" />
                              )
                            ) : feature[plan] === '-' ? (
                              <span className="text-gray-400">—</span>
                            ) : (
                              <span className={`font-medium
                                ${plan === 'popular' ? 'text-primary' : 'text-gray-900'}`}>
                                {feature[plan]}
                              </span>
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  ])}
                </tbody>
              </table>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden space-y-8">
              {[
                { name: 'Start', price: '299' },
                { name: 'Popular', price: '399', recommended: true },
                { name: 'Pro', price: '499' }
              ].map((plan) => (
                <div
                  key={plan.name}
                  className="relative rounded-xl border border-gray-200 bg-white shadow-lg p-6"
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-primary text-white text-sm
                                   font-medium rounded-full inline-block whitespace-nowrap">
                        Recomandat
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`font-bold text-xl mb-2 mt-4
                      ${plan.recommended ? 'text-primary' : 'text-gray-900'}`}>
                      {plan.name}
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-3xl font-bold
                        ${plan.recommended ? 'text-primary' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-500">MDL/lună</span>
                    </div>
                  </div>

                  {/* Mobile Features List */}
                  <div className="space-y-4">
                    {comparisonFeatures.map((section) => (
                      <div key={section.category}>
                        <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                          <div className="text-primary">{section.icon}</div>
                          {section.category}
                        </div>
                        <div className="space-y-2">
                          {section.features.map((feature) => (
                            <div key={feature.name} className="flex justify-between text-sm">
                              <span className="text-gray-600">{feature.name}</span>
                              <span className="font-medium text-gray-900">
                                {typeof feature[plan.name.toLowerCase()] === 'boolean'
                                  ? (feature[plan.name.toLowerCase()]
                                    ? <CheckIcon className="w-5 h-5 text-primary" />
                                    : <span className="block w-5 h-0.5 bg-gray-300 rounded-full" />)
                                  : feature[plan.name.toLowerCase()]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pregătit să Începi?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o ofertă personalizată sau pentru mai multe detalii
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-medium
                     shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              Contactează-ne
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
