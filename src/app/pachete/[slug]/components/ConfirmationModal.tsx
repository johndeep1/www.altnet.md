"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import type { PricingPlan } from "@/data/pricing-plans";
import type { OrderFormData } from "../schemas/orderFormSchema";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  plan: PricingPlan;
  formData: OrderFormData;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  plan,
  formData,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isSubmitting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()}
            className="absolute inset-0 bg-gray-950/25 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2
                id="confirmation-title"
                className="text-lg font-semibold text-gray-900"
              >
                Confirma Comanda
              </h2>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Inchide"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-5">
              {/* Package Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">
                  Pachet selectat
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pachet:</span>
                    <span className="font-semibold text-gray-900">
                      {plan.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Viteza:</span>
                    <span className="font-medium">{plan.speed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pret lunar:</span>
                    <span className="font-semibold text-primary">
                      {plan.price} lei
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">
                  Datele dumneavoastra
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nume:</span>
                    <span className="font-medium text-gray-900">
                      {formData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">
                      {formData.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telefon:</span>
                    <span className="font-medium text-gray-900">
                      {formData.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adresa:</span>
                    <span className="font-medium text-gray-900 text-right max-w-[200px]">
                      {formData.address}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Verificati datele si confirmati comanda. Veti primi un email de
                confirmare.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editeaza
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary via-primary-dark to-primary shadow-lg shadow-primary/20 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Se trimite...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      Confirma Comanda
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
