// app/value-pulse/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ValueTrackers } from '@/features/value-pulse/value-trackers';
import { ValueTimeline } from '@/features/value-pulse/value-timeline';
import { FinancialSummary } from '@/features/value-pulse/financial-summary';

export default function ValuePulse() {
  const [lastUpdated, setLastUpdated] = useState('5m ago');

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor(Math.random() * 5) + 1;
      setLastUpdated(`${minutes}m ago`);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50/30">
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Value Pulse
          </h1>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Last updated: {lastUpdated}</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                Live Updates
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <ValueTrackers />
            <ValueTimeline />
            <FinancialSummary />
          </div>
        </div>
      </div>
    </div>
  );
}