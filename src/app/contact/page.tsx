'use client';

import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const contactMethods = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: 'Telefon',
    value: '+373 69 123 456',
    description: 'Luni - Vineri: 8:00 - 18:00',
    action: 'Sună Acum'
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: 'Email',
    value: 'info@starnet.md',
    description: 'Răspundem în maxim 24 ore',
    action: 'Scrie-ne'
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: 'Adresă',
    value: 'Str. Principală 123, Ialoveni',
    description: 'Vizitează-ne la oficiu',
    action: 'Vezi pe Hartă'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-16">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactează-ne
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suntem aici să te ajutăm. Alege metoda preferată de contact sau
            completează formularul și te vom contacta noi.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8
                       border border-gray-200 shadow-lg hover:shadow-xl
                       transition-all duration-300 cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center
                              justify-center text-primary mb-6 group-hover:scale-110
                              transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {method.value}
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  {method.description}
                </p>
                <span className="text-primary font-medium inline-flex items-center gap-2">
                  {method.action}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent
                           to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nume Complet
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors"
                    placeholder="Ion Popescu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors"
                    placeholder="ion.popescu@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors"
                    placeholder="+373 69 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subiect
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Selectează</option>
                    <option value="internet">Internet</option>
                    <option value="tv">Televiziune</option>
                    <option value="telefonie">Telefonie</option>
                    <option value="suport">Suport Tehnic</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-colors"
                  placeholder="Cum te putem ajuta?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-primary text-white rounded-xl font-medium
                         shadow-lg shadow-primary/25 hover:bg-primary/90
                         transition-colors relative overflow-hidden"
              >
                <span className={`transition-opacity ${sending ? 'opacity-0' : 'opacity-100'}`}>
                  Trimite Mesajul
                </span>
                {sending && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Working Hours Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-gray-600">
            <ClockIcon className="w-5 h-5" />
            Program de lucru: Luni - Vineri: 8:00 - 20:00 | Sâmbătă: 9:00 - 17:00
          </div>
        </motion.div>
      </div>
    </main>
  );
}
