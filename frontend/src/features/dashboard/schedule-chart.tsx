// components/dashboard/schedule-chart.tsx
'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ScheduleChart() {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        borderRadius: 4
      }
    },
    series: [{
      name: 'Completed',
      data: [7, 7, 15, 3]
    }, {
      name: 'Remaining',
      data: [0, 0, 6, 0]
    }],
    xaxis: {
      categories: ['Planning', 'Shutdown', 'Maintenance', 'Startup'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    colors: ['#2196f3', '#e9ecef'],
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val + ' days';
      }
    }
  };

  return (
    <ReactApexChart 
      options={options}
      series={options.series}
      type="bar"
      height="100%"
    />
  );
}
