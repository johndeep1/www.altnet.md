'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ConsistentBackground } from './HeroSection';
import { SpeedTestInterface } from '@/components/speedtest/SpeedTestInterface';
import { SpeedTestResults } from '@/components/speedtest/SpeedTestResults';
import { SpeedTestHistory } from '@/components/speedtest/SpeedTestHistory';
import type { SpeedTestResult } from '@/types/speedtest';

export default function SpeedTestSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isMounted, setIsMounted] = useState(false);
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [history, setHistory] = useState<SpeedTestResult[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Load history from localStorage
    const savedHistory = localStorage.getItem('altnet-speedtest-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load speed test history:', error);
      }
    }
  }, []);

  const handleTestComplete = useCallback((result: SpeedTestResult) => {
    setCurrentResult(result);
    
    // Add to history
    const newHistory = [result, ...history].slice(0, 10); // Keep last 10 results
    setHistory(newHistory);
    
    // Save to localStorage
    try {
      localStorage.setItem('altnet-speedtest-history', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save speed test history:', error);
    }
  }, [history]);

  const handleNewTest = useCallback(() => {
    setCurrentResult(null);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen -mt-24 pt-28 sm:pt-48" ref={ref}>
      {/* Consistent Background Pattern */}
      <ConsistentBackground />

      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Speed Indicator Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl
                         rounded-2xl border border-primary/10 shadow-lg shadow-primary/5 mb-8"
            >
              <div className="flex gap-[3px]">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ["16px", "20px", "16px"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-primary">
                Test Oficial Altnet
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900 block mb-2">Testează</span>
              <motion.span
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary"
              >
                Viteza Internetului
              </motion.span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verifică viteza reală a conexiunii tale de internet cu instrumentul nostru profesional.
              <span className="text-primary font-semibold">
                {" "}Rezultate precise în timp real.
              </span>
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Speed Test Interface - Main Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <SpeedTestInterface 
                onTestComplete={handleTestComplete}
                onNewTest={handleNewTest}
                currentResult={currentResult}
                isMounted={isMounted}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Results Display */}
              {currentResult && (
                <SpeedTestResults result={currentResult} />
              )}

              {/* Speed Test History */}
              {history.length > 0 && (
                <SpeedTestHistory 
                  history={history}
                  onClearHistory={() => {
                    setHistory([]);
                    localStorage.removeItem('altnet-speedtest-history');
                  }}
                />
              )}

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <h3 className="font-semibold text-gray-900 mb-3">Cum funcționează?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Tehnologie LibreSpeed pentru acuratețe profesională</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Test download cu fișiere adaptive (1-10MB)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Upload cu date securizate criptografic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Măsurare ping pe multiple servere CDN</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Fallback automat la servere de rezervă</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                  <h3 className="font-semibold text-gray-900 mb-3">Pentru rezultate precise</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Închide alte aplicații care folosesc internetul</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Conectează-te prin cablu Ethernet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Oprește alte dispozitive din rețea</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-800">LibreSpeed Engine</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Integrare cu tehnologia LibreSpeed - platforma open-source utilizată de furnizorii profesioniști pentru măsurători exacte de viteză.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
    </section>
  );
}