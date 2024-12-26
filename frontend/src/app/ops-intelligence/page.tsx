// app/ops-intelligence/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { VendorPerformanceChart } from '@/features/ops-intelligence/vendor-performance-chart';
import { SafetyIncidentsChart } from '@/features/ops-intelligence/safety-incidents-chart';
import { CostBreakdownChart } from '@/features/ops-intelligence/cost-breakdown-chart';
import { ResourceUtilizationChart } from '@/features/ops-intelligence/resource-utilization-chart';
import { EquipmentDowntimeChart } from '@/features/ops-intelligence/equipment-downtime-chart';
import { TaskCompletionChart } from '@/features/ops-intelligence/task-completion-chart';
import { AiInsights } from '@/features/ops-intelligence/ai-insights';

export default function OpsIntelligence() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="h-screen flex flex-col bg-gray-50/30">
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-4">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Operational Intelligence
            </h1>
          </div>

          {/* Controls */}
          <div className="mb-6 flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white border rounded-md text-gray-600 text-sm"
              title="timeRange"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Apply Filters
            </button>
          </div>

          {/* AI Insights Section */}
          <div className="mb-6">
            <AiInsights />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="h-[300px]">
                <VendorPerformanceChart />
              </div>
            </Card>

            <Card className="p-4">
              <div className="h-[300px]">
                <SafetyIncidentsChart />
              </div>
            </Card>

            <Card className="p-4">
              <div className="h-[300px]">
                <CostBreakdownChart />
              </div>
            </Card>

            <Card className="p-4">
              <div className="h-[300px]">
                <ResourceUtilizationChart />
              </div>
            </Card>

            <Card className="p-4">
              <div className="h-[300px]">
                <EquipmentDowntimeChart />
              </div>
            </Card>

            <Card className="p-4">
              <div className="h-[300px]">
                <TaskCompletionChart />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}