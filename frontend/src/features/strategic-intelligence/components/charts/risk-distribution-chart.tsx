// app/components/strategic-intelligence/charts/risk-distribution-chart.tsx

'use client';

import dynamic from 'next/dynamic';
import { riskDistributionData } from '@/features/strategic-intelligence/data/strategic-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function RiskDistributionChart() {
  const options = {
    chart: {
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    labels: riskDistributionData.labels,
    colors: riskDistributionData.colors,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(1)}% of total risk`
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <ReactApexChart
      options={options}
      series={riskDistributionData.series}
      type="pie"
      height="100%"
    />
  );
}