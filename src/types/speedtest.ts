export interface SpeedTestResult {
  id: string;
  timestamp: number;
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  ping: number; // ms
  jitter: number; // ms
  server: string;
  location: string;
  userAgent: string;
  ipAddress?: string;
}

export interface SpeedTestProgress {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number; // 0-100
  currentSpeed?: number;
  avgSpeed?: number;
}

export interface SpeedTestConfig {
  downloadTestDuration: number; // seconds
  uploadTestDuration: number; // seconds
  progressUpdateInterval: number; // ms
  testEndpoints: string[];
  maxTestSize: number; // bytes
}

export interface SpeedTestServer {
  id: string;
  name: string;
  location: string;
  url: string;
  distance?: number;
}

export const DEFAULT_CONFIG: SpeedTestConfig = {
  downloadTestDuration: 15, // Longer test for more accuracy
  uploadTestDuration: 12,   // Even longer upload test for accuracy
  progressUpdateInterval: 200, // More frequent updates for upload
  testEndpoints: [
    'https://httpbin.org/bytes/',
    'https://httpbin.org/post',
    'https://httpbin.org/anything',
    'https://postman-echo.com/post'
  ],
  maxTestSize: 25 * 1024 * 1024, // 25MB max file size
};

// Speed categories for result interpretation
export const SPEED_CATEGORIES = {
  download: {
    excellent: 100, // Mbps
    good: 50,
    fair: 25,
    poor: 10,
  },
  upload: {
    excellent: 50, // Mbps
    good: 25,
    fair: 10,
    poor: 5,
  },
  ping: {
    excellent: 20, // ms
    good: 50,
    fair: 100,
    poor: 200,
  },
} as const;

export type SpeedCategory = 'excellent' | 'good' | 'fair' | 'poor';

export function getSpeedCategory(value: number, type: 'download' | 'upload' | 'ping'): SpeedCategory {
  const thresholds = SPEED_CATEGORIES[type];
  
  if (type === 'ping') {
    // For ping, lower is better
    if (value <= thresholds.excellent) return 'excellent';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.fair) return 'fair';
    return 'poor';
  } else {
    // For download/upload, higher is better
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.fair) return 'fair';
    return 'poor';
  }
}

export function formatSpeed(speed: number): string {
  if (speed >= 1000) {
    return `${(speed / 1000).toFixed(1)} Gbps`;
  }
  return `${speed.toFixed(1)} Mbps`;
}

export function formatPing(ping: number): string {
  return `${Math.round(ping)} ms`;
}