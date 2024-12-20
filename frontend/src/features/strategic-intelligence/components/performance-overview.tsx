// features/strategic-intelligence/components/performance-overview.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import dynamic from 'next/dynamic';

interface PlantData {
  plant: string;
  completion: number;
  trend: number;
  daysRemaining: number;
  status: 'On Track' | 'Delayed' | 'At Risk';
}

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="h-[180px] w-[180px] bg-gray-50 rounded-full animate-pulse" />
  ),
});

const ProgressRing = ({
  percentage,
  daysRemaining,
  status,
  trend,
}: {
  percentage: number;
  daysRemaining: number;
  status: string;
  trend: number;
}) => {
  const options = useMemo(() => ({
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '70%' },
        track: { background: '#f1f5f9' },
        dataLabels: {
          value: {
            offsetY: 7,
            fontSize: '24px',
            color: '#3b82f6',
            formatter: (val: number) => `${val}%`,
          },
          name: { show: false },
        },
      },
    },
    fill: { colors: ['#3b82f6'] },
    stroke: { lineCap: 'round' },
  }), []);

  // Ensure percentage is a valid number
  const validPercentage = !isNaN(percentage) ? percentage : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="h-[180px] w-[180px]">
        {typeof window !== 'undefined' && (
          <Chart 
            options={options} 
            series={[validPercentage]} 
            type="radialBar" 
            height={180} 
          />
        )}
      </div>
      <div className="mt-1 text-sm text-gray-500">{daysRemaining} days left</div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className={`text-sm ${
            status === 'On Track'
              ? 'text-green-600'
              : status === 'Delayed'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {status}
        </span>
        <span
          className={`text-sm font-medium ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend > 0 ? `+${trend}%` : `${trend}%`}
        </span>
      </div>
    </div>
  );
};

export function PerformanceOverview() {
  const [selectedView, setSelectedView] = useState('all');
  const [plantData, setPlantData] = useState<PlantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        const data: PlantData[] = [
          { plant: 'Plant A', completion: 75, trend: +2, daysRemaining: 12, status: 'On Track' },
          { plant: 'Plant B', completion: 60, trend: -1, daysRemaining: 18, status: 'Delayed' },
          { plant: 'Plant C', completion: 90, trend: +5, daysRemaining: 5, status: 'On Track' },
          { plant: 'Plant D', completion: 80, trend: +3, daysRemaining: 8, status: 'On Track' },
          { plant: 'Plant E', completion: 85, trend: +1, daysRemaining: 7, status: 'At Risk' },
        ];
        if (mounted) {
          setPlantData(data);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter data based on selected view
  const filteredData = useMemo(() => {
    return selectedView === 'critical'
      ? plantData.filter(plant => plant.status === 'At Risk' || plant.status === 'Delayed')
      : plantData;
  }, [selectedView, plantData]);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Multi-Plant Turnaround Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time completion progress across facilities
          </p>
        </div>
        <select
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          className="px-3 py-1.5 bg-white border rounded-md text-sm text-gray-600"
        >
          <option value="all">All Plants</option>
          <option value="critical">Critical Only</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {isLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="text-lg font-medium text-gray-800 text-center mb-4">
                <div className="h-6 w-20 bg-gray-100 rounded mx-auto" />
              </div>
              <div className="h-[180px] w-[180px] bg-gray-100 rounded-full mx-auto" />
            </div>
          ))
        ) : filteredData.length > 0 ? (
          filteredData.map((data) => (
            <div key={data.plant}>
              <div className="text-lg font-medium text-gray-800 text-center mb-4">
                {data.plant}
              </div>
              <div className="flex justify-center">
                <ProgressRing
                  percentage={data.completion}
                  daysRemaining={data.daysRemaining}
                  status={data.status}
                  trend={data.trend}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-500">
            No data available
          </div>
        )}
      </div>
    </Card>
  );
}