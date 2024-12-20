// components/ops-intelligence/TaskCompletionChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { taskData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function TaskCompletionChart() {
  const options = {
    chart: {
      type: 'line',
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
      curve: 'smooth',
      width: 3
    },
    colors: ['#6366f1'],
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: {
        size: 6
      }
    },
    xaxis: {
      categories: taskData.categories.map(date => 
        new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      ),
      title: {
        text: 'Date'
      }
    },
    yaxis: {
      title: {
        text: 'Tasks Completed'
      },
      min: 0
    },
    tooltip: {
      x: {
        formatter: function(val: number) {
          return new Date(taskData.categories[val]).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">Task Completion Trend</h2>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ReactApexChart 
          options={options}
          series={taskData.series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
}