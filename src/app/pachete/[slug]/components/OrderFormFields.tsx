"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { orderFormSchema, type OrderFormData } from "../schemas/orderFormSchema";
import type { PricingPlan } from "@/data/pricing-plans";
import SuccessState from "./SuccessState";
import ConfirmationModal from "./ConfirmationModal";

interface OrderFormFieldsProps {
  plan: PricingPlan;
}

// Hook for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

export default function OrderFormFields({ plan }: OrderFormFieldsProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    setFocus,
    getValues,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Animation props with reduced motion support
  const getMotionProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {};
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.3 },
    };
  };

  const onFormSubmit = () => {
    // Open confirmation modal instead of submitting directly
    setShowConfirmation(true);
  };

  const onConfirmOrder = async () => {
    const data = getValues();
    setIsSubmitting(true);

    try {
      if (!plan.id) {
        throw new Error("Pachetul selectat nu este disponibil momentan.");
      }

      const response = await fetch("/api/pachete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          planId: plan.id,
          planTitle: plan.title,
          planSpeed: plan.speed,
          planPrice: plan.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "A aparut o eroare la trimiterea comenzii"
        );
      }

      setShowConfirmation(false);
      setIsSuccess(true);
      reset();

      // Focus success message for accessibility
      setTimeout(() => successRef.current?.focus(), 100);
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowConfirmation(false);
      toast.error(
        error instanceof Error
          ? error.message
          : "A aparut o eroare. Va rugam sa incercati din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Focus first error field on validation failure
  useEffect(() => {
    const errorFields = Object.keys(errors) as (keyof OrderFormData)[];
    if (errorFields.length > 0) {
      setFocus(errorFields[0]);
    }
  }, [errors, setFocus]);

  if (isSuccess) {
    return (
      <SuccessState
        ref={successRef}
        plan={plan}
        onOrderAnother={() => setIsSuccess(false)}
      />
    );
  }

  const inputBaseClasses = cn(
    "w-full px-4 py-3 rounded-xl",
    "border-2 border-gray-200 bg-gray-50",
    "focus:border-green-500 focus:bg-white focus:outline-none",
    "transition-all duration-200",
    "placeholder:text-gray-400"
  );

  const getInputClasses = (fieldName: keyof OrderFormData) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];

    return cn(
      inputBaseClasses,
      hasError && "border-red-300 focus:border-red-500",
      isTouched && !hasError && "border-green-200"
    );
  };

  return (
    <>
      <motion.div
        {...getMotionProps()}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 lg:p-8"
      >
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          aria-label="Formular comanda pachet"
          className="space-y-6"
        >
          {/* Personal Information Fieldset */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-gray-900">
              Informatii Personale
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nume Complet{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Ion Popescu"
                  className={getInputClasses("name")}
                  {...register("name")}
                />
                <AnimatePresence mode="wait">
                  {errors.name && (
                    <motion.p
                      id="name-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="nume@exemplu.md"
                  className={getInputClasses("email")}
                  {...register("email")}
                />
                <AnimatePresence mode="wait">
                  {errors.email && (
                    <motion.p
                      id="email-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </fieldset>

          {/* Contact Information Fieldset */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-gray-900">
              Informatii de Contact
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telefon{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "phone-error" : "phone-hint"
                  }
                  placeholder="+373 68 000 000"
                  className={getInputClasses("phone")}
                  {...register("phone")}
                />
                <p id="phone-hint" className="mt-1 text-xs text-gray-500">
                  Format: +373 XX XXX XXX
                </p>
                <AnimatePresence mode="wait">
                  {errors.phone && (
                    <motion.p
                      id="phone-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.phone.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresa Instalare{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="address"
                  type="text"
                  autoComplete="street-address"
                  aria-required="true"
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "address-error" : undefined}
                  placeholder="Strada Independentei 10, Ialoveni"
                  className={getInputClasses("address")}
                  {...register("address")}
                />
                <AnimatePresence mode="wait">
                  {errors.address && (
                    <motion.p
                      id="address-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.address.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!isValid}
            aria-disabled={!isValid}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-white",
              "bg-gradient-to-r from-primary via-primary-dark to-primary",
              "shadow-lg shadow-primary/20",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
              "hover:shadow-xl"
            )}
          >
            Continua cu Comanda
          </motion.button>

          <p className="text-xs text-gray-500 text-center">
            Veti putea revizui comanda inainte de confirmare
          </p>
        </form>
      </motion.div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={onConfirmOrder}
        isSubmitting={isSubmitting}
        plan={plan}
        formData={getValues()}
      />
    </>
  );
}
