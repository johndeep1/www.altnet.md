'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/button-variants';
import { SpeedTestEngine } from '@/lib/speedtest-engine';
import type { SpeedTestResult, SpeedTestProgress } from '@/types/speedtest';
import { formatSpeed, formatPing } from '@/types/speedtest';

interface SpeedTestInterfaceProps {
  onTestComplete: (result: SpeedTestResult) => void;
  onNewTest: () => void;
  currentResult: SpeedTestResult | null;
  isMounted: boolean;
}

export function SpeedTestInterface({ 
  onTestComplete, 
  onNewTest, 
  currentResult, 
  isMounted 
}: SpeedTestInterfaceProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<SpeedTestProgress>({
    phase: 'idle',
    progress: 0
  });
  const engineRef = useRef<SpeedTestEngine | null>(null);

  // Calculate stroke offset for progress ring
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray * (1 - progress.progress / 100);

  useEffect(() => {
    engineRef.current = new SpeedTestEngine();
    
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  const startTest = useCallback(async () => {
    if (!engineRef.current || isRunning) return;

    setIsRunning(true);
    onNewTest();

    try {
      // Set up progress callback
      engineRef.current.onProgress = (progressData: SpeedTestProgress) => {
        setProgress(progressData);
      };

      // Start the test
      const result = await engineRef.current.start();
      
      // Test completed successfully
      onTestComplete(result);
      setProgress({ phase: 'complete', progress: 100 });
      
    } catch (error) {
      console.error('Speed test failed:', error);
      setProgress({ phase: 'idle', progress: 0 });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, onTestComplete, onNewTest]);

  const stopTest = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
    }
    setIsRunning(false);
    setProgress({ phase: 'idle', progress: 0 });
  }, []);

  const getPhaseText = () => {
    switch (progress.phase) {
      case 'ping':
        return 'Testez latența...';
      case 'download':
        return 'Testez download...';
      case 'upload':
        return 'Testez upload...';
      case 'complete':
        return 'Test finalizat!';
      default:
        return 'Apasă pentru a începe';
    }
  };

  const getPhaseColor = () => {
    switch (progress.phase) {
      case 'ping':
        return 'text-blue-600';
      case 'download':
        return 'text-green-600';
      case 'upload':
        return 'text-purple-600';
      case 'complete':
        return 'text-primary';
      default:
        return 'text-gray-600';
    }
  };

  // Animation variants
  const containerVariants = {
    idle: {
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    testing: {
      scale: 1.02,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const iconVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 2
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    testing: {
      scale: 1.1,
      rotate: 360,
      transition: {
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 300
        }
      }
    }
  };

  const textVariants = {
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl shadow-primary/5 p-8 lg:p-12">
      {/* Main Interface */}
      <div className="text-center space-y-8">
        {/* Perfect Circular Container */}
        <motion.div
          variants={containerVariants}
          animate={isRunning ? "testing" : "idle"}
          className="relative mx-auto"
          style={{
            width: 'clamp(240px, 20vw, 320px)',
            aspectRatio: '1',
            willChange: 'transform'
          }}
        >
          {/* Outer Progress Ring */}
          <div className="absolute inset-0 rounded-full">
            {/* Background Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="3"
                className="drop-shadow-sm"
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.4))'
                }}
                transition={{
                  strokeDashoffset: {
                    type: "spring",
                    damping: 30,
                    stiffness: 200
                  }
                }}
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#16A34A" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Rotating Background Effect */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/5 to-transparent"
              animate={{
                rotate: progress.phase !== 'idle' ? [0, 360] : 0
              }}
              transition={{
                duration: 8,
                repeat: progress.phase !== 'idle' ? Infinity : 0,
                ease: "linear"
              }}
            />
          </div>

          {/* Inner Content Circle */}
          <div 
            className="absolute inset-3 bg-white rounded-full shadow-2xl shadow-primary/10 border border-gray-100/50"
            style={{
              display: 'grid',
              placeItems: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            <AnimatePresence mode="wait">
              {progress.phase === 'idle' || progress.phase === 'complete' ? (
                <motion.div
                  key="idle-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  variants={textVariants}
                  className="grid place-items-center gap-3 text-center px-4"
                  style={{ lineHeight: 1.2 }}
                >
                  {currentResult ? (
                    <>
                      <motion.div
                        className="text-4xl lg:text-5xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 15,
                          stiffness: 300,
                          delay: 0.1
                        }}
                      >
                        {formatSpeed(Math.max(currentResult.downloadSpeed, currentResult.uploadSpeed))}
                      </motion.div>
                      <motion.div
                        className="text-sm text-gray-500 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Viteză maximă
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        variants={iconVariants}
                        animate="pulse"
                        className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full grid place-items-center mb-2"
                        style={{ willChange: 'transform' }}
                      >
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </motion.div>
                      <motion.div
                        className="text-lg font-semibold text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Începe testul
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="testing-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  variants={textVariants}
                  className="grid place-items-center gap-3 text-center px-4"
                  style={{ lineHeight: 1.2 }}
                >
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-primary"
                    key={progress.currentSpeed}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300
                    }}
                  >
                    {progress.currentSpeed ? formatSpeed(progress.currentSpeed) : '--'}
                  </motion.div>
                  
                  {progress.avgSpeed && (
                    <motion.div
                      className="text-sm text-gray-500 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Medie: {formatSpeed(progress.avgSpeed)}
                    </motion.div>
                  )}
                  
                  <motion.div
                    className="text-lg font-semibold text-gray-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {Math.round(progress.progress)}%
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
            animate={{
              opacity: progress.phase !== 'idle' ? [0.3, 0.6, 0.3] : 0.1,
              scale: progress.phase !== 'idle' ? [1, 1.1, 1] : 1
            }}
            transition={{
              duration: 2,
              repeat: progress.phase !== 'idle' ? Infinity : 0,
              ease: "easeInOut"
            }}
            style={{ zIndex: -1 }}
          />
        </motion.div>

        {/* Phase Text with Smooth Transitions */}
        <motion.div
          key={progress.phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 400
          }}
          className={`text-xl font-semibold ${getPhaseColor()} tracking-wide`}
        >
          {getPhaseText()}
        </motion.div>

        {/* Real-time Stats with Enhanced Animation */}
        <AnimatePresence>
          {(progress.phase === 'download' || progress.phase === 'upload') && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                staggerChildren: 0.1
              }}
              className="grid grid-cols-2 gap-4 max-w-sm mx-auto"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div className="text-sm text-gray-500 mb-1 font-medium">Download</div>
                <div className="text-lg font-bold text-green-600">
                  {progress.phase === 'download' && progress.currentSpeed
                    ? formatSpeed(progress.currentSpeed)
                    : '--'}
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div className="text-sm text-gray-500 mb-1 font-medium">Upload</div>
                <div className="text-lg font-bold text-purple-600">
                  {progress.phase === 'upload' && progress.currentSpeed
                    ? formatSpeed(progress.currentSpeed)
                    : '--'}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Action Button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isRunning ? (
            <AnimatedButton
              variant="outline"
              onClick={stopTest}
              isMounted={isMounted}
              className="w-full max-w-xs mx-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <motion.svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </motion.svg>
              Oprește testul
            </AnimatedButton>
          ) : (
            <AnimatedButton
              variant="primary"
              onClick={startTest}
              isMounted={isMounted}
              className="w-full max-w-xs mx-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <motion.svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </motion.svg>
              {currentResult ? 'Testează din nou' : 'Începe testul'}
            </AnimatedButton>
          )}
        </motion.div>
      </div>
    </div>
  );
}