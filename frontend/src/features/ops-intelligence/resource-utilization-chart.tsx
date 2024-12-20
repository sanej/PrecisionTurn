// components/ops-intelligence/ResourceUtilizationChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { resourceData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ResourceUtilizationChart() {
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
        colors: {
          ranges: [{
            from: 0,
            to: 50,
            color: '#ef4444'
          }, {
            from: 51,
            to: 75,
            color: '#f59e0b'
          }, {
            from: 76,
            to: 100,
            color: '#22c55e'
          }]
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return val + '%';
      }
    },
    xaxis: {
      categories: resourceData.categories,
      labels: {
        rotate: -45,
        trim: true
      }
    },
    yaxis: {
      title: {
        text: 'Utilization (%)'
      },
      max: 100
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Resource Utilization</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={resourceData.series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
}