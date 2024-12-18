'use client';

import { motion } from 'framer-motion';
import {
  RocketLaunchIcon,
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { ConsistentBackground } from '@/components/sections/HeroSection';

const values = [
  {
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    title: 'Inovație',
    description: 'Adoptăm cele mai noi tehnologii pentru a oferi servicii de top'
  },
  {
    icon: <UserGroupIcon className="w-6 h-6" />,
    title: 'Orientare spre Client',
    description: 'Punem nevoile clienților noștri pe primul loc'
  },
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'Pasiune',
    description: 'Suntem pasionați de tehnologie și servicii de calitate'
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: 'Calitate',
    description: 'Oferim servicii premium la standarde înalte'
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: 'Încredere',
    description: 'Construim relații de lungă durată bazate pe încredere'
  },
  {
    icon: <TrophyIcon className="w-6 h-6" />,
    title: 'Excelență',
    description: 'Tindem spre excelență în tot ceea ce facem'
  }
];

const stats = [
  { value: '15k+', label: 'Clienți Activi' },
  { value: '98%', label: 'Clienți Mulțumiți' },
  { value: '24/7', label: 'Suport Tehnic' },
  { value: '10+', label: 'Ani de Experiență' }
];

const timeline = [
  {
    year: '2013',
    title: 'Începutul Călătoriei',
    description: 'ALTNET își începe activitatea cu o viziune clară: internet rapid și accesibil pentru toți.'
  },
  {
    year: '2015',
    title: 'Extinderea Rețelei',
    description: 'Implementarea infrastructurii de fibră optică în primele regiuni.'
  },
  {
    year: '2017',
    title: 'Lansarea TV Digital',
    description: 'Introducerea serviciilor de televiziune digitală HD.'
  },
  {
    year: '2020',
    title: 'Inovație Tehnologică',
    description: 'Upgrade-ul rețelei la viteze de până la 1 Gbps.'
  },
  {
    year: '2023',
    title: 'Prezent',
    description: 'Continuăm să inovăm și să extindem serviciile noastre.'
  }
];

export default function DesprePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Consistent Background for entire page */}
      <ConsistentBackground />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] -mt-24 pt-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              <span className="block mb-2">Despre</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
                ALTNET
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Conectăm oamenii prin tehnologie de ultimă generație și servicii de înaltă calitate
            </p>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Mission Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/20"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Misiunea Noastră</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  La ALTNET, ne-am asumat misiunea de a transforma modul în care oamenii se conectează și comunică.
                  Prin infrastructura noastră de fibră optică de ultimă generație, oferim servicii de internet și
                  televiziune digitală la cele mai înalte standarde.
                </p>
                <p>
                  Ne angajăm să fim mereu în fruntea inovației tehnologice, oferind clienților noștri cele mai
                  bune soluții pentru nevoile lor de comunicare și divertisment.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/20 text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Values Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Valorile Noastre</h2>
            <p className="mt-4 text-xl text-gray-600">
              Principiile care ne ghidează în fiecare zi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Timeline Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Istoria Noastră</h2>
            <p className="mt-4 text-xl text-gray-600">
              O călătorie de succes în lumea telecomunicațiilor
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between"
                >
                  <div className="flex items-center w-full">
                    <div className="w-1/2 pr-8 text-right">
                      <div className="text-xl font-bold text-primary">{item.year}</div>
                      <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                      <div className="text-gray-600">{item.description}</div>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full relative z-10">
                      <div className="w-4 h-4 bg-primary/30 rounded-full absolute animate-ping" />
                    </div>
                    <div className="w-1/2 pl-8">
                      {index % 2 === 1 && (
                        <>
                          <div className="text-xl font-bold text-primary">{item.year}</div>
                          <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                          <div className="text-gray-600">{item.description}</div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
