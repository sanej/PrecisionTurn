// components/ops-intelligence/CostBreakdownChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { costData } from '@/features/ops-intelligence/data/ops-intelligence-data';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function CostBreakdownChart() {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
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
    labels: costData.labels,
    colors: ['#3b82f6', '#22c55e', '#f59e0b', '#6366f1', '#64748b'],
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return Math.round(val);
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Cost',
              formatter: function() {
                return '100%';
              }
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Cost Breakdown</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={costData.series}
          type="donut"
          height="100%"
        />
      </div>
    </div>
  );
}