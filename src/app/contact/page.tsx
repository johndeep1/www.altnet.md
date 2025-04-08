'use client';

import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  TvIcon,
  PhoneArrowUpRightIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';

const contactMethods = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: 'Telefon',
    value: '+373 268 85 555',
    description: 'Luni - Sâmbătă: 8:00 - 19:00  Duminică: 9:00 - 17:00',

    action: 'Sună Acum',
    href: 'tel:+37326885555'
  },
  {
    icon: <PhoneIcon className="w-6 h-6 text-[#7360F2]" />,
    title: 'Viber',
    value: '+373 789 66 177',
    description: 'Disponibil pentru mesaje și apeluri',
    action: 'Contactează-ne pe Viber',
    href: 'viber://chat?number=%2B373789661770'
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: 'Email',
    value: 'sales@altnet.md',
    description: 'Răspundem în maxim 24 ore',
    action: 'Scrie-ne',
    href: 'mailto:sales@altnet.md'
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: 'Adresă',
    value: 'Alexandru cel Bun 57, Ialoveni, Moldova',
    description: 'Vizitează-ne la oficiu',
    action: 'Vezi pe Hartă',
    href: '#map'
  }
];

const subjectOptions = [
  {
    value: 'internet',
    label: 'Internet',
    icon: <GlobeAltIcon className="w-5 h-5" />
  },
  {
    value: 'tv',
    label: 'Televiziune',
    icon: <TvIcon className="w-5 h-5" />
  },
  {
    value: 'telefonie',
    label: 'Telefonie',
    icon: <PhoneArrowUpRightIcon className="w-5 h-5" />
  },
  {
    value: 'suport',
    label: 'Suport Tehnic',
    icon: <WrenchScrewdriverIcon className="w-5 h-5" />
  },
  {
    value: 'altele',
    label: 'Altele',
    icon: <QuestionMarkCircleIcon className="w-5 h-5" />
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
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormStatus({ type: null, message: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare la trimiterea mesajului');
      }

      // Clear the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setFormStatus({
        type: 'success',
        message: 'Mesajul a fost trimis cu succes! Vom reveni cu un răspuns în cel mai scurt timp.'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'A apărut o eroare la trimiterea mesajului'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Consistent Background */}
      {/* <ConsistentBackground /> */}

      <div className="relative">
        {/* Header Section */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Contactează-<span className="text-primary">ne</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Suntem aici să te ajutăm. Alege metoda preferată de contact sau
                completează formularul și te vom contacta noi.
              </p>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/50" />
        </section>

        {/* Contact Methods Section */}
        <section className="relative py-10">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm p-6
                           border border-gray-200/50 shadow-lg hover:shadow-xl
                           transition-all duration-300 cursor-pointer"
                >
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 ${method.title === 'Viber' ? 'bg-[#7360F2]/10' : 'bg-primary/10'} rounded-xl flex items-center
                                  justify-center ${method.title === 'Viber' ? 'text-[#7360F2]' : 'text-primary'} mb-4 group-hover:scale-110
                                  transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      {method.value}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/50" />
        </section>

        {/* Contact Form and Map Section */}
        <section className="relative py-12">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 order-2 lg:order-1"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nume Complet
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200/50
                                 focus:ring-2 focus:ring-primary/20 focus:border-primary
                                 transition-colors bg-white/80"
                        placeholder="Nume și Prenume"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200/50
                                 focus:ring-2 focus:ring-primary/20 focus:border-primary
                                 transition-colors bg-white/80"
                        placeholder="exemplu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200/50
                                 focus:ring-2 focus:ring-primary/20 focus:border-primary
                                 transition-colors bg-white/80"
                        placeholder="+373 69 123 456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subiect
                      </label>
                      <CustomSelect
                        options={subjectOptions}
                        value={formData.subject}
                        onChange={(value) => setFormData({ ...formData, subject: value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mesaj
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
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
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium
                             shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40
                             transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                                  -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                    <div className="flex items-center justify-center">
                      <span className={`transition-opacity ${sending ? 'opacity-0' : 'opacity-100'} flex items-center`}>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                        Trimite Mesajul
                      </span>
                    </div>
                    {sending && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </motion.button>

                  {/* Form Status Message */}
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-xl ${
                        formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                        'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      <div className="flex items-start">
                        {formStatus.type === 'success' ? (
                          <svg className="w-5 h-5 mr-2 mt-0.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-2 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        )}
                        <span>{formStatus.message}</span>
                      </div>
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden order-1 lg:order-2"
                id="map"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2723.813943085349!2d28.77364847746949!3d46.94569577113691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97f6fac31bb87%3A0x2f538bcb370b6f01!2sAltNet!5e0!3m2!1sen!2s!4v1734528911635!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '450px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/50" />
        </section>

        {/* Working Hours Section */}
        <section className="relative py-10">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-200/50">
                <ClockIcon className="w-5 h-5" />
                Program de lucru: Luni - Sâmbătă: 8:00 - 19:00 | Duminică: 9:00 - 17:00
              </div>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/50" />
        </section>
      </div>
    </main>
  );
}
