"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { defaultPlans } from "@/components/pricing/PricingCards";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function PackageFormPage() {
  const params = useParams();
  const [selectedPlan, setSelectedPlan] = useState(defaultPlans[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const plan = defaultPlans.find((p) => p.title.toLowerCase() === params.id);
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Here you would typically send the data to your backend
      console.log("Submitting form data:", {
        ...formData,
        plan: selectedPlan.title,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success(
        "Comanda a fost trimisă cu succes! Vă vom contacta în curând."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("A apărut o eroare. Vă rugăm să încercați din nou.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen relative">
      <div className="relative">
        {/* Header Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Comandă Pachetul{" "}
                <span className="text-primary">{selectedPlan.title}</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Completați formularul pentru a comanda pachetul{" "}
                {selectedPlan.title} cu viteza de {selectedPlan.speed} la prețul
                de {selectedPlan.price} lei/lună
              </p>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
        </section>

        {/* Form Section */}
        <section className="relative py-16">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/50" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume Complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
                      placeholder="Ion Popescu"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
                      placeholder="ion.popescu@example.com"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
                      placeholder="+373 69 123 456"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresa
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
                      placeholder="Strada, numărul casei/apartamentului, orașul"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informații Adiționale (opțional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors bg-white/80"
                    placeholder="Adăugați orice informații suplimentare care ne-ar putea ajuta..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
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
                  <span
                    className={`transition-opacity ${
                      sending ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Trimite Comanda
                  </span>
                  {sending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
        </section>
      </div>
    </main>
  );
}
