"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  CheckIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import type { PricingPlan } from "@/data/pricing-plans";

interface SuccessStateProps {
  plan: PricingPlan;
  onOrderAnother?: () => void;
}

const SuccessState = forwardRef<HTMLDivElement, SuccessStateProps>(
  ({ plan, onOrderAnother }, ref) => {
    return (
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="alert"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200/50 p-6 lg:p-8 text-center focus:outline-none"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckIcon className="w-10 h-10 text-green-600" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Comanda a fost trimisa cu succes!
          </h2>
          <p className="text-gray-600 mb-6">
            Va multumim pentru comanda pachetului{" "}
            <strong className="text-primary">{plan.title}</strong>.
            <br />
            Va vom contacta in curand pentru a confirma detaliile.
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-xl p-4 mb-6 text-left"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Rezumat comanda
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Pachet:</span>
              <span className="font-medium text-gray-900">{plan.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Viteza:</span>
              <span className="font-medium text-gray-900">{plan.speed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pret lunar:</span>
              <span className="font-medium text-primary">{plan.price} lei</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          <a
            href="tel:+37326885555"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            +373 268 85 555
          </a>
          <a
            href="mailto:sales@altnet.md"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4" />
            sales@altnet.md
          </a>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-xl p-4 mb-6 text-left"
        >
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Urmatorii pasi
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Veti primi un email de confirmare in cateva minute</li>
            <li>• Echipa noastra va va contacta pentru programare</li>
            <li>• Instalarea se face in maxim 48 de ore</li>
          </ul>
        </motion.div>

        {/* Order Another Button */}
        {onOrderAnother && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onOrderAnother}
            className="text-sm text-gray-500 hover:text-primary transition-colors underline underline-offset-2"
          >
            Plaseaza o alta comanda
          </motion.button>
        )}
      </motion.div>
    );
  }
);

SuccessState.displayName = "SuccessState";

export default SuccessState;
