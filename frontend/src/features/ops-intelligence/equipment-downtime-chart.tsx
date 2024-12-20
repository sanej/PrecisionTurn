// components/ops-intelligence/EquipmentDowntimeChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { equipmentData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function EquipmentDowntimeChart() {
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
        horizontal: true,
        borderRadius: 4,
        barHeight: '70%',
        distributed: true
      }
    },
    colors: ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#6366f1', '#64748b', '#8b5cf6'],
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return val + ' hrs';
      }
    },
    xaxis: {
      categories: equipmentData.categories,
      title: {
        text: 'Hours'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Equipment Downtime</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={equipmentData.series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
}