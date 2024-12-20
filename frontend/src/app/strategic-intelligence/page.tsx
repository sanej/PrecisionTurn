// app/strategic-intelligence/page.tsx

'use client';

import { useState } from 'react';
import { AiInsights } from '@/features/strategic-intelligence/components/ai-insights';
import { PerformanceOverview } from '@/features/strategic-intelligence/components/performance-overview';
import { KpiGrid } from '@/features/strategic-intelligence/components/kpi-grid/kpi-grid';
import { ChartGrid } from '@/features/strategic-intelligence/components/chart-grid';
import { ScenarioPlanning } from '@/features/strategic-intelligence/components/scenario-planning';

// Import the KPI data
import { kpiData } from '@/features/strategic-intelligence/data/kpi-data';

export default function StrategicIntelligence() {
  const [lastUpdated, setLastUpdated] = useState('5m ago');

  return (
    <div className="h-screen flex flex-col bg-gray-50/30">
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Strategic Turnaround Intelligence
          </h1>

          {/* AI Insights */}
          <div className="mb-6">
            <AiInsights />
          </div>

          {/* Multi-Plant Overview */}
          <div className="mb-6">
            <PerformanceOverview />
          </div>

          {/* KPI Grid */}
          <div className="mb-6">
            <KpiGrid initialData={kpiData} />
          </div>

          {/* Chart Grid */}
          <div className="mb-6">
            <ChartGrid />
          </div>

          {/* Scenario Planning */}
          <div className="mb-6">
            <ScenarioPlanning />
          </div>
        </div>
      </div>
    </div>
  );
}