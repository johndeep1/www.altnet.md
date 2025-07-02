'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { SpeedTestResult } from '@/types/speedtest';
import { formatSpeed, formatPing } from '@/types/speedtest';

interface SpeedTestHistoryProps {
  history: SpeedTestResult[];
  onClearHistory: () => void;
}

export function SpeedTestHistory({ history, onClearHistory }: SpeedTestHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  
  if (history.length === 0) {
    return null;
  }

  const displayHistory = showAll ? history : history.slice(0, 3);

  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Acum';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}z`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Istoric teste</h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors"
        >
          Șterge tot
        </button>
      </div>

      {/* History List */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayHistory.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500">
                  {getRelativeTime(result.timestamp)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      {formatSpeed(result.downloadSpeed)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      {formatSpeed(result.uploadSpeed)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      {formatPing(result.ping)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Mini Chart */}
              <div className="flex gap-1 h-8 items-end">
                {/* Download bar */}
                <div className="flex-1 bg-gray-200 rounded-sm relative overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${Math.min((result.downloadSpeed / 1000) * 100, 100)}%` 
                    }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="bg-green-500 absolute bottom-0 left-0 right-0 rounded-sm"
                  />
                </div>
                
                {/* Upload bar */}
                <div className="flex-1 bg-gray-200 rounded-sm relative overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${Math.min((result.uploadSpeed / 500) * 100, 100)}%` 
                    }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="bg-purple-500 absolute bottom-0 left-0 right-0 rounded-sm"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More/Less */}
      {history.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          {showAll ? 'Vezi mai puțin' : `Vezi toate (${history.length})`}
        </button>
      )}

      {/* Statistics */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Statistici</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm font-semibold text-green-600">
              {formatSpeed(
                history.reduce((sum, r) => sum + r.downloadSpeed, 0) / history.length
              )}
            </div>
            <div className="text-xs text-gray-500">Dl medie</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-purple-600">
              {formatSpeed(
                history.reduce((sum, r) => sum + r.uploadSpeed, 0) / history.length
              )}
            </div>
            <div className="text-xs text-gray-500">Up medie</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-blue-600">
              {formatPing(
                history.reduce((sum, r) => sum + r.ping, 0) / history.length
              )}
            </div>
            <div className="text-xs text-gray-500">Ping mediu</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}