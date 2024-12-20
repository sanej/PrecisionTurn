// app/components/strategic-intelligence/charts/financial-metrics-chart.tsx

'use client';

import dynamic from 'next/dynamic';
import { financialMetricsData } from '@/features/strategic-intelligence/data/strategic-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function FinancialMetricsChart() {
  const options = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: financialMetricsData.categories
    },
    yaxis: {
      title: {
        text: 'Value ($M)'
      }
    },
    colors: ['#2563eb', '#10b981', '#f59e0b'],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => `$${value.toFixed(1)}M`
      }
    }
  };

  return (
    <ReactApexChart
      options={options}
      series={financialMetricsData.series}
      type="bar"
      height="100%"
    />
  );
}