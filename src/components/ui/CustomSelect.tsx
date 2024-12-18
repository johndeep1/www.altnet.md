'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Selectează',
  required = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = options.find(option => option.value === value);
    setSelectedLabel(selected ? selected.label : '');
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200/50
                   focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-colors bg-white/80 text-left flex items-center justify-between
                   ${!value ? 'text-gray-500' : 'text-gray-900'}`}
      >
        <span>{selectedLabel || placeholder}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform duration-200
                     ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-200/50
                     shadow-xl shadow-gray-200/20 backdrop-blur-sm overflow-hidden"
          >
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3
                             transition-colors
                             ${value === option.value
                               ? 'text-primary bg-primary/5'
                               : 'text-gray-600'}`}
                >
                  {option.icon && (
                    <span className="flex-shrink-0">{option.icon}</span>
                  )}
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {required && (
        <input
          type="text"
          tabIndex={-1}
          required
          value={value}
          onChange={() => {}}
          style={{ opacity: 0, height: 0, position: 'absolute' }}
        />
      )}
    </div>
  );
}
