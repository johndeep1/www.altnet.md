'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid';
import TestimonialCard from '../testimonials/TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: "Ion Moisei",
    role: "Antreprenor",
    image: "/testimonials/alex.jpg",
    content: "Serviciile lor au transformat complet modul în care îmi gestionez afacerea online. Viteza și stabilitatea sunt excepționale.",
    rating: 5,
    company: "TechStart SRL",
    tags: ["Internet", "TV Digital"]
  },
  {
    id: 2,
    name: "Adrian Vatcarau",
    role: "Game Developer",
    image: "/testimonials/maria.jpg",
    content: "Ca gamer și dezvoltator, am nevoie de o conexiune stabilă și rapidă. Serviciul lor de gaming optimizat este exact ce căutam.",
    rating: 5,
    company: "GameCraft Studios",
    tags: ["Gaming", "Fibră Optică"]
  },
  {
    id: 3,
    name: "Daniel Radu",
    role: "Content Creator",
    image: "/testimonials/daniel.jpg",
    content: "Uploadurile pentru YouTube nu au fost niciodată mai rapide. Serviciul lor de internet este perfect pentru creatorii de conținut.",
    rating: 5,
    company: "Digital Media Pro",
    tags: ["Internet", "Streaming"]
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Modern Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute w-[800px] h-[800px] -right-96 top-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[600px] h-[600px] -left-80 bottom-0 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <ChatBubbleBottomCenterIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Testimoniale
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="block mb-2">Ce Spun</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-violet-600">
              Clienții Noștri
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperă experiențele reale ale clienților noștri și vezi de ce ne aleg pentru serviciile lor digitale
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-500">Clienți mulțumiți</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-500">Suport tehnic</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">15k+</div>
              <div className="text-sm text-gray-500">Clienți activi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
