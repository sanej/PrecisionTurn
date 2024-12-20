// app/components/strategic-intelligence/charts/cross-plant-learning-chart.tsx

'use client';

import dynamic from 'next/dynamic';
import { crossPlantLearningData } from '@/features/strategic-intelligence/data/strategic-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function CrossPlantLearningChart() {
  const options = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    xaxis: {
      categories: crossPlantLearningData.categories,
      labels: {
        style: {
          colors: Array(5).fill('#64748b'),
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    fill: {
      opacity: 0.2
    },
    stroke: {
      width: 2,
      curve: 'straight'
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    colors: ['#2563eb', '#10b981'],
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#64748b'
      }
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false, 
      followCursor: true,
      theme: 'light',
      y: {
        formatter: (value: number) => `${value}%`
      }
    },
    grid: {
      show: true,
      padding: {
        top: 0,
        bottom: 0
      }
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e2e8f0',
          strokeWidth: 1,
          connectorColors: '#e2e8f0',
          fill: {
            colors: ['#f8fafc', '#fff']
          }
        },
        size: 100
      }
    },
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: 'light',
      palette: 'palette1'
    }
  };

  return (
    <div className="h-full w-full">
      <ReactApexChart
        options={options}
        series={crossPlantLearningData.series}
        type="radar"
        height="100%"
        width="100%"
      />
    </div>
  );
}