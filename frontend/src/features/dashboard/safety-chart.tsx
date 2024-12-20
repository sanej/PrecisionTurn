// components/dashboard/safety-chart.tsx
'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SafetyChart() {
  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      }
    },
    series: [{
      name: 'TRIR',
      data: [0.50, 0.45, 0.40, 0.35]
    }, {
      name: 'Industry Average',
      data: [0.55, 0.52, 0.50, 0.48]
    }],
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yaxis: {
      title: {
        text: 'Total Recordable Incident Rate'
      },
      min: 0.30,
      max: 0.60,
      tickAmount: 5,
      labels: {
        formatter: (value) => value.toFixed(2)
      }
    },
    colors: ['#2196f3', '#4caf50'],
    stroke: {
      curve: 'smooth',
      width: [3, 2],
      dashArray: [0, 5]
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
      type="line"
      height="100%"
    />
  );
}