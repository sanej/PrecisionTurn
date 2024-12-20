// app/components/strategic-intelligence/components/chart-grid.tsx

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  FinancialMetricsChart,
  RiskDistributionChart,
  CrossPlantLearningChart
} from './charts/index';

import { Maximize2, Minimize2 } from 'lucide-react';

export function ChartGrid() {
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  const charts = [
    {
      id: 'financial',
      title: 'Financial Metrics by Plant',
      component: FinancialMetricsChart
    },
    /* Removed risk distribution chart for now, will revisit later
    {
      id: 'risk',
      title: 'Dynamic Risk Assessment',
      component: RiskDistributionChart
    },
    */
    {
      id: 'learning',
      title: 'Cross-Plant Learning',
      component: CrossPlantLearningChart
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {charts.map(({ id, title, component: ChartComponent }) => {
        const isExpanded = expandedChart === id;
        
        return (
          <Card
            key={id}
            className={`p-4 transition-all duration-300 ${
              isExpanded ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {title}
              </h3>
              <button
                onClick={() => setExpandedChart(isExpanded ? null : id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5 text-gray-600" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
            
            <div className={`transition-all duration-300 ${
              isExpanded ? 'h-[500px]' : 'h-[300px]'
            }`}>
              <ChartComponent />
            </div>
          </Card>
        );
      })}
    </div>
  );
}