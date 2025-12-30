"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DescriptionSectionProps {
  description: string;
  descriptionRo?: string;
  descriptionRu?: string;
}

const MAX_HEIGHT = 150; // pixels

function CollapsibleDescription({
  label,
  text,
}: {
  label?: string;
  text: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsToggle(contentRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [text]);

  return (
    <div>
      {label && (
        <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
          {label}
        </h3>
      )}
      <div className="relative">
        <motion.div
          animate={{ maxHeight: isExpanded ? 1000 : MAX_HEIGHT }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div ref={contentRef}>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {text}
            </p>
          </div>
        </motion.div>
        {!isExpanded && needsToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/95 via-white/80 to-transparent pointer-events-none" />
        )}
      </div>
      {needsToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {isExpanded ? "Afișează mai puțin" : "Afișează mai mult"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </motion.div>
        </button>
      )}
    </div>
  );
}

export default function DescriptionSection({
  description,
  descriptionRo,
  descriptionRu,
}: DescriptionSectionProps) {
  const hasContent = description || descriptionRo || descriptionRu;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">Descriere</h2>

      {description && (
        <CollapsibleDescription
          text={description || "Descriere în curs de actualizare."}
        />
      )}

      {descriptionRo && (
        <div className="pt-4 border-t border-gray-100">
          <CollapsibleDescription label="Descriere RO" text={descriptionRo} />
        </div>
      )}

      {descriptionRu && (
        <div className="pt-4 border-t border-gray-100">
          <CollapsibleDescription label="Descriere RU" text={descriptionRu} />
        </div>
      )}
    </div>
  );
}
