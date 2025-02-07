import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  isMounted?: boolean;
  className?: string;
}

export function AnimatedButton({
  variant = "primary",
  children,
  isMounted = true,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group relative overflow-hidden px-8 py-4 rounded-xl font-medium w-full";
  const primaryClasses = "bg-primary text-white shadow-lg shadow-primary/25";
  const outlineClasses =
    "border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500";

  return (
    <motion.button
      initial={false}
      whileHover={isMounted ? { scale: 1.01, y: -1 } : {}}
      whileTap={isMounted ? { scale: 0.99 } : {}}
      className={cn(
        baseClasses,
        variant === "primary" ? primaryClasses : outlineClasses,
        className
      )}
      {...props}
    >
      {variant === "primary" && !className?.includes("bg-gradient") && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export function ArrowIcon({
  direction = "right",
}: {
  direction?: "right" | "forward";
}) {
  if (direction === "right") {
    return (
      <svg
        className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}
