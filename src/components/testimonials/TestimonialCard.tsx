'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  company: string;
  tags: string[];
  index: number;
  isInView: boolean;
}

export default function TestimonialCard({
  name,
  role,
  image,
  content,
  rating,
  company,
  tags,
  index,
  isInView
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="relative group"
    >
      {/* Card Background with Glass Effect */}
      <div className="absolute inset-0 rounded-3xl transition-all duration-300
                    bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-200/70
                    group-hover:shadow-2xl group-hover:shadow-gray-200/80
                    group-hover:-translate-y-2" />

      <div className="relative p-8">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-gray-600 mb-6">
          &quot;{content}&quot;
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{role} @ {company}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium
                       bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-4xl text-primary/10 font-serif">
          &quot;
        </div>
      </div>
    </motion.div>
  );
}
