'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SpeedTestResult } from '@/types/speedtest';
import { formatSpeed, formatPing, getSpeedCategory } from '@/types/speedtest';

interface SpeedTestResultsProps {
  result: SpeedTestResult;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'excellent':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'good':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'fair':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'poor':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'excellent':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'good':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'fair':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'poor':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

export function SpeedTestResults({ result }: SpeedTestResultsProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const downloadCategory = getSpeedCategory(result.downloadSpeed, 'download');
  const uploadCategory = getSpeedCategory(result.uploadSpeed, 'upload');
  const pingCategory = getSpeedCategory(result.ping, 'ping');

  const shareResults = async () => {
    const shareText = `Rezultatele testului de viteză Altnet:
📥 Download: ${formatSpeed(result.downloadSpeed)}
📤 Upload: ${formatSpeed(result.uploadSpeed)}  
⚡ Ping: ${formatPing(result.ping)}
🗓️ ${new Date(result.timestamp).toLocaleString('ro-RO')}

Testează și tu pe altnet.md/testare-viteza`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rezultatele testului de viteză',
          text: shareText,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard?.writeText(shareText);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        // You could add a toast notification here
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Rezultatele testului</h3>
        <div className="text-xs text-gray-500">
          {new Date(result.timestamp).toLocaleString('ro-RO')}
        </div>
      </div>

      {/* Main Results */}
      <div className="space-y-4">
        {/* Download Speed */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-7-7m7 7l7-7" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900">Download</div>
              <div className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${getCategoryColor(downloadCategory)}`}>
                {getCategoryIcon(downloadCategory)}
                {downloadCategory === 'excellent' ? 'Excelent' : 
                 downloadCategory === 'good' ? 'Bun' :
                 downloadCategory === 'fair' ? 'Satisfăcător' : 'Slab'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {formatSpeed(result.downloadSpeed)}
            </div>
          </div>
        </div>

        {/* Upload Speed */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l7 7m-7-7l-7 7" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900">Upload</div>
              <div className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${getCategoryColor(uploadCategory)}`}>
                {getCategoryIcon(uploadCategory)}
                {uploadCategory === 'excellent' ? 'Excelent' : 
                 uploadCategory === 'good' ? 'Bun' :
                 uploadCategory === 'fair' ? 'Satisfăcător' : 'Slab'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-purple-600">
              {formatSpeed(result.uploadSpeed)}
            </div>
          </div>
        </div>

        {/* Ping */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900">Ping</div>
              <div className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${getCategoryColor(pingCategory)}`}>
                {getCategoryIcon(pingCategory)}
                {pingCategory === 'excellent' ? 'Excelent' : 
                 pingCategory === 'good' ? 'Bun' :
                 pingCategory === 'fair' ? 'Satisfăcător' : 'Slab'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              {formatPing(result.ping)}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showDetails ? 'Ascunde detalii' : 'Vezi detalii'}
        </button>
        <button
          onClick={shareResults}
          className="flex-1 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
        >
          Distribuie
        </button>
      </div>

      {/* Details */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 pt-4 space-y-2 text-sm"
        >
          <div className="flex justify-between">
            <span className="text-gray-600">Server:</span>
            <span className="font-medium">{result.server}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Locație:</span>
            <span className="font-medium">{result.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Jitter:</span>
            <span className="font-medium">{formatPing(result.jitter)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IP:</span>
            <span className="font-medium font-mono text-xs">
              {result.ipAddress || 'Nedisponibil'}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}