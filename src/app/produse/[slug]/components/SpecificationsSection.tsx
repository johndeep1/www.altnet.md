"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type ProductProperty = {
  name: string;
  value: string;
  group: string;
};

interface SpecificationsSectionProps {
  groupedProperties: Record<string, ProductProperty[]>;
}

const INITIAL_ITEMS_VISIBLE = 6;

function SpecificationGroup({
  group,
  entries,
}: {
  group: string;
  entries: ProductProperty[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsToggle = entries.length > INITIAL_ITEMS_VISIBLE;
  const visibleEntries = isExpanded
    ? entries
    : entries.slice(0, INITIAL_ITEMS_VISIBLE);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-5">
      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
        {group}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence initial={false}>
          {visibleEntries.map((entry, index) => (
            <motion.div
              key={`${group}-${entry.name}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-100/50"
            >
              <span className="text-sm text-gray-600">{entry.name}</span>
              <span className="text-sm font-medium text-gray-900 text-right ml-2">
                {entry.value}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {needsToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mx-auto"
        >
          {isExpanded
            ? "Afișează mai puțin"
            : `Afișează toate (${entries.length})`}
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

export default function SpecificationsSection({
  groupedProperties,
}: SpecificationsSectionProps) {
  const groups = Object.entries(groupedProperties);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const INITIAL_GROUPS = 2;
  const needsGroupToggle = groups.length > INITIAL_GROUPS;
  const visibleGroups = showAllGroups ? groups : groups.slice(0, INITIAL_GROUPS);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6 lg:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Specificații tehnice
        </h2>
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {visibleGroups.map(([group, entries]) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SpecificationGroup group={group} entries={entries} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {needsGroupToggle && (
          <button
            onClick={() => setShowAllGroups(!showAllGroups)}
            className="mt-6 w-full py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
          >
            {showAllGroups
              ? "Ascunde categorii"
              : `Afișează toate categoriile (${groups.length})`}
            <motion.div
              animate={{ rotate: showAllGroups ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.div>
          </button>
        )}
      </div>
    </section>
  );
}
