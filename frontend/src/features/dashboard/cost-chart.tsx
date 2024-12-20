// components/dashboard/cost-chart.tsx
'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function CostChart() {
  const options = {
    chart: {
      type: 'area',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    series: [{
      name: 'Actual Cost',
      data: [30, 60, 100, 140]
    }, {
      name: 'Budget',
      data: [35, 70, 105, 150]
    }, {
      name: 'AI Forecast',
      data: [null, null, null, 140, 155]
    }],
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    },
    yaxis: {
      title: {
        text: 'Cost (Millions $)'
      },
      labels: {
        formatter: (value) => `$${value}M`
      }
    },
    colors: ['#2196f3', '#4caf50', '#ff9800'],
    stroke: {
      curve: 'smooth',
      width: [2, 2, 2]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    }
  };

  return (
    <ReactApexChart 
      options={options}
      series={options.series}
      type="area"
      height="100%"
     />
  );
}