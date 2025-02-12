"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableDescriptionProps {
  text: string;
  className?: string;
}

export function ExpandableDescription({
  text,
  className,
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the text by:
  // 1. Preserving line breaks
  // 2. Ensuring proper spacing after punctuation
  // 3. Trimming extra whitespace
  const formattedText = text
    .replace(/([.!?])\s*/g, "$1 ") // Add space after punctuation if missing
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace

  return (
    <div className={cn("relative", className)}>
      <p
        className={cn(
          "text-sm text-muted-foreground transition-all duration-300 whitespace-pre-line leading-relaxed",
          !isExpanded && "line-clamp-2"
        )}
      >
        {formattedText}
      </p>
      {text.length > 100 && (
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent link navigation when inside a link
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-1 transition-colors"
        >
          {isExpanded ? (
            <>
              Mai puțin <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Mai mult <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
