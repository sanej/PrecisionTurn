// components/ops-intelligence/SafetyIncidentsChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { safetyData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SafetyIncidentsChart() {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
      }
    },
    colors: ['#ef4444'],
    xaxis: {
      categories: safetyData.categories
    },
    yaxis: {
      title: {
        text: 'Number of Incidents'
      }
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + ' incidents';
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Safety Incidents</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={safetyData.series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
}