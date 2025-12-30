"use client";

import { motion } from "framer-motion";
import type { PricingPlan } from "@/data/pricing-plans";
import PackageSummaryCard from "./components/PackageSummaryCard";
import OrderFormFields from "./components/OrderFormFields";
import InlineContactInfo from "./components/InlineContactInfo";

interface PackageOrderFormProps {
  plan: PricingPlan;
}

export default function PackageOrderForm({ plan }: PackageOrderFormProps) {
  return (
    <main className="min-h-screen relative">
      <div className="relative">
        {/* Header Section - Reduced spacing */}
        <section className="relative pt-32 pb-4 overflow-hidden">
          {/* Subtle gradient */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-white/30" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Comanda Pachetul{" "}
                <span className="text-primary">{plan.title}</span>
              </h1>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Completati datele pentru a finaliza comanda
              </p>
            </motion.div>
          </div>
        </section>

        {/* Two-column Content Section */}
        <section className="relative py-4 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Package Summary - 2/5 width on desktop, sticky */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start space-y-6">
                <PackageSummaryCard plan={plan} />
                <InlineContactInfo className="hidden lg:block" />
              </div>

              {/* Form - 3/5 width on desktop */}
              <div className="lg:col-span-3">
                <OrderFormFields plan={plan} />
              </div>
            </div>

            {/* Mobile-only contact info */}
            <InlineContactInfo className="mt-8 lg:hidden" />
          </div>
        </section>
      </div>
    </main>
  );
}
