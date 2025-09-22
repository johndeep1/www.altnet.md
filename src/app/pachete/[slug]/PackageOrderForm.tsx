"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import type { PricingPlan } from "@/data/pricing-plans";

interface PackageOrderFormProps {
  plan: PricingPlan;
}

export default function PackageOrderForm({ plan }: PackageOrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/pachete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          planTitle: plan.title,
          planSpeed: plan.speed,
          planPrice: plan.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "A apărut o eroare la trimiterea comenzii");
      }

      toast.success(
        "Comanda a fost trimisă cu succes! Vă vom contacta în curând."
      );

      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "A apărut o eroare. Vă rugăm să încercați din nou."
      );
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
                Comandă Pachetul {" "}
                <span className="text-primary">{plan.title}</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Completați formularul pentru a comanda pachetul {plan.title} cu viteza
                de {plan.speed} la prețul de {plan.price} lei/lună
              </p>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
        </section>

        {/* Form Section */}
        <section className="relative py-16">
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
                      placeholder="nume@exemplu.md"
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
                      placeholder="+373 68 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresă Instalare
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                               focus:ring-2 focus:ring-primary/20 focus:border-primary
                               transition-colors bg-white/80"
                      placeholder="Strada Independenței 10, Ialoveni"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informații adiționale
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200/50
                             focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-colors bg-white/80"
                    placeholder="Menționați detalii suplimentare despre locație sau preferințe"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl
                           bg-gradient-to-r from-primary via-primary-dark to-primary text-white
                           font-semibold shadow-lg shadow-primary/20 transition-transform duration-200
                           hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? "Se trimite comanda..." : "Trimite Comanda"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6">
                <PhoneIcon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
                <p className="text-sm text-gray-600">+373 268 85 555</p>
                <p className="text-sm text-gray-600">+373 789 66 177</p>
              </div>
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6">
                <EnvelopeIcon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-sm text-gray-600">sales@altnet.md</p>
                <p className="text-sm text-gray-600">support@altnet.md</p>
              </div>
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6">
                <MapPinIcon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Adresă</h3>
                <p className="text-sm text-gray-600">
                  Str. Alexandru cel Bun 55
                  <br />
                  Ialoveni, Moldova
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
