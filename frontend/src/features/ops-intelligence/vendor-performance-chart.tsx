// components/ops-intelligence/VendorPerformanceChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { vendorData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function VendorPerformanceChart() {
  const options = {
    chart: {
      height: '100%',
      width: '100%',
      type: 'radar',
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
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.2
    },
    markers: {
      size: 3,
      hover: {
        size: 4
      }
    },
    plotOptions: {
      radar: {
        size: 90,  // Increased from default
        polygons: {
          strokeColors: '#e2e8f0',
          strokeWidth: 1,
          connectorColors: '#e2e8f0'
        }
      }
    },
    xaxis: {
      categories: vendorData.categories,
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      show: true,
      min: 0,
      max: 100,
      tickAmount: 5
    },
    colors: ['#2196f3', '#4caf50'],
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + '%';
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Vendor Performance</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={vendorData.series}
          type="radar"
          height="100%"
        />
      </div>
    </div>
  );
}