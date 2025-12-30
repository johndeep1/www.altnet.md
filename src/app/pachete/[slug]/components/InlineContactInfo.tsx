"use client";

import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface InlineContactInfoProps {
  className?: string;
}

export default function InlineContactInfo({ className }: InlineContactInfoProps) {
  return (
    <div
      className={cn(
        "bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50",
        className
      )}
    >
      <p className="text-xs font-medium text-gray-500 uppercase mb-3">
        Ai intrebari? Contacteaza-ne
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:+37326885555"
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
          aria-label="Suna la +373 268 85 555"
        >
          <PhoneIcon className="w-4 h-4 text-primary" aria-hidden="true" />
          +373 268 85 555
        </a>
        <a
          href="mailto:sales@altnet.md"
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
          aria-label="Trimite email la sales@altnet.md"
        >
          <EnvelopeIcon className="w-4 h-4 text-primary" aria-hidden="true" />
          sales@altnet.md
        </a>
      </div>
    </div>
  );
}
