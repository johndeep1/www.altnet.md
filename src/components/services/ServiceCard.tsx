'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  index: number;
  gradient: string;
  features: string[];
  isInView: boolean;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  gradient,
  features,
  index,
  isInView,
  className = ""
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative group h-full ${className}`}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-lg shadow-gray-200/70
                    transform transition-all duration-300 group-hover:scale-[1.02]
                    group-hover:shadow-xl group-hover:shadow-gray-200/80" />

      <div className="relative p-8">
        {/* Icon Container */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient}
                        flex items-center justify-center text-white mb-6
                        transform transition-all duration-300 group-hover:scale-110
                        group-hover:shadow-lg group-hover:rotate-3`}>
          <div className="absolute inset-0 rounded-xl bg-white opacity-20
                        group-hover:opacity-30 transition-opacity" />
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3
                     group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: (index * 0.1) + (i * 0.1) }}
              className="flex items-center text-sm text-gray-600"
            >
              <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient}
                             flex items-center justify-center mr-3 flex-shrink-0`}>
                <CheckIcon className="w-3 h-3 text-white" />
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden rounded-b-2xl">
          <div className={`h-full bg-gradient-to-r ${gradient}
                          transform origin-left scale-x-0 transition-transform
                          duration-300 group-hover:scale-x-100`} />
        </div>
      </div>
    </motion.div>
  );
}
