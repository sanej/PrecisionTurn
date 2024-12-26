// features/turnaround-navigator/components/charts/spend-trends.tsx

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SpendTrendData, ChartConfig } from '@/types/charts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SpendTrendsProps {
  data?: SpendTrendData[];
}

const defaultData: SpendTrendData[] = [
  { month: 'Month 1', spend: 300 },
  { month: 'Month 2', spend: 450 },
  { month: 'Month 3', spend: 720 },
  { month: 'Month 4', spend: 980 },
  { month: 'Month 5', spend: 1250 },
  { month: 'Month 6', spend: 1500 }
];

function getChartConfig(data: SpendTrendData[]): ChartConfig {
  return {
    data,
    options: {
      chart: {
        type: 'line',
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif',
        background: '#ffffff',
        animations: {
          enabled: true
        }
      },
      grid: {
        show: true,
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        padding: {
          top: 10,
          right: 20,
          bottom: 10,
          left: 10
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: data.map(d => d.month),
        labels: {
          style: {
            colors: '#4B5563',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 200,
        max: 1600,
        tickAmount: 7,
        labels: {
          style: {
            colors: '#4B5563',
            fontSize: '12px'
          },
          formatter: (value: number) => `${value}`
        }
      },
      colors: ['#38BDF8'],
      markers: {
        size: 4,
        colors: ['#38BDF8'],
        strokeColors: '#ffffff',
        strokeWidth: 2
      },
      legend: {
        show: true,
        position: 'top',
        labels: {
          colors: '#4B5563'
        }
      },
      responsive: [{
        breakpoint: 1024,
        options: {
          chart: {
            height: '300'
          },
          grid: {
            padding: {
              right: 15,
              left: 15
            }
          }
        }
      }, {
        breakpoint: 768,
        options: {
          chart: {
            height: '250'
          },
          grid: {
            padding: {
              right: 10,
              left: 10
            }
          },
          yaxis: {
            tickAmount: 5
          }
        }
      }]
    }
  };
}

export const SpendTrends = ({ data = defaultData }: SpendTrendsProps) => {
  const chartConfig = useMemo(() => getChartConfig(data), [data]);
  
  return (
    <div className="w-full overflow-hidden">
      <div className="relative" style={{ minHeight: '250px', maxHeight: '400px' }}>
        <ApexChart
          options={chartConfig.options}
          series={[{
            name: 'Spend in $K',
            data: chartConfig.data.map(d => d.spend)
          }]}
          type="line"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};