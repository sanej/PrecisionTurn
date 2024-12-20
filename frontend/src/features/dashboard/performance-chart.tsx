// components/dashboard/performance-chart.tsx

'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function PerformanceChart() {
  const options = {
    chart: {
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
    series: [{
      name: 'Current',
      data: [78, 85, 72, 88, 76]  // More realistic spread

    }, {
      name: 'Benchmark',
      data: [75, 80, 75, 85, 75]  // Tighter benchmark range
    }],
    xaxis: {
      categories: ['Overall', 'Cost', 'Schedule', 'Safety', 'Quality'],
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
    markers: {
      size: 3,
      hover: {
        size: 4
      }
    },
    fill: {
      opacity: 0.2
    },
    colors: ['#2196f3', '#4caf50'],
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + '%';
        }
      }
    },
    plotOptions: {
      radar: {
        size: 72,  // Increased from default
        polygons: {
          strokeColors: '#e2e8f0',
          strokeWidth: 1,
          connectorColors: '#e2e8f0'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={options.series}
          type="radar"
          height="100%"
        />
      </div>
    </div>
  );
}