"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export default function CollapsibleText({
  text,
  maxLines = 4,
  className = "",
}: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * maxLines;
      setNeedsToggle(textRef.current.scrollHeight > maxHeight);
    }
  }, [text, maxLines]);

  return (
    <div className={className}>
      <motion.div
        animate={{ height: isExpanded ? "auto" : `${maxLines * 1.5}em` }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden relative"
      >
        <p
          ref={textRef}
          className="text-gray-600 whitespace-pre-line leading-relaxed"
        >
          {text}
        </p>
        {!isExpanded && needsToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        )}
      </motion.div>
      {needsToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {isExpanded ? "Afișează mai puțin" : "Afișează mai mult"}
        </button>
      )}
    </div>
  );
}
