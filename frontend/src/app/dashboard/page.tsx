//app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { PerformanceChart } from '@/features/dashboard/performance-chart';
import { CostChart } from '@/features/dashboard/cost-chart';
import { ScheduleChart } from '@/features/dashboard/schedule-chart';
import { SafetyChart } from '@/features/dashboard/safety-chart';

export default function Dashboard() {
  const [benchmarkRegion, setBenchmarkRegion] = useState('global');

  return (
    <div className="h-screen flex flex-col bg-gray-50/30">
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto h-full p-4">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Refinery Turnaround Dashboard
            </h1>
          </div>

          {/* Controls */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md">
              <span className="text-sm font-medium">AI Insights Active</span>
            </div>
            <label htmlFor="benchmarkRegion" className="sr-only">Benchmark Region</label>
            <select
              id="benchmarkRegion"
              value={benchmarkRegion}
              onChange={(e) => setBenchmarkRegion(e.target.value)}
              className="px-3 py-1.5 bg-white border rounded-md text-gray-600 text-sm"
            >
              <option value="global">Global</option>
              <option value="regional">Regional</option>
            </select>
          </div>

          {/* Charts Grid - now uses remaining height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-8rem)]">
            <Card className="flex flex-col p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">Performance Index</h2>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">Top 15%</span>
              </div>
              <div className="flex-grow min-h-[200px]">
                <PerformanceChart />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Performance trending 8% above industry average
              </div>
            </Card>

            <Card className="flex flex-col p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">Cost Overview</h2>
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">$155M Forecast</span>
              </div>
              <div className="flex-grow min-h-[200px]">
                <CostChart />
              </div>
              <div className="mt-2 text-xs text-red-600">
                Projected 5% cost overrun - Action required
              </div>
            </Card>

            <Card className="flex flex-col p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">Schedule Progress</h2>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">2 days ahead</span>
              </div>
              <div className="flex-grow min-h-[200px]">
                <ScheduleChart />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Optimized critical path identified
              </div>
            </Card>

            <Card className="flex flex-col p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">Safety Performance</h2>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">10% better</span>
              </div>
              <div className="flex-grow min-h-[200px]">
                <SafetyChart />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                AI predicts continued positive trend
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}