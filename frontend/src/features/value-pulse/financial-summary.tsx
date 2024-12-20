// app/value-pulse/components/financial-summary.tsx
'use client';

import { Card } from '@/components/ui/card';
import { financialData, valueMetrics } from '@/features/value-pulse/data/value-pulse-data';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', valueMetrics.formatting.currency).format(amount);
}

function calculateGrowth(current: number, previous: number) {
  return ((current - previous) / previous * 100).toFixed(1);
}

export function FinancialSummary() {
  const { totalValue, valueAtRisk } = financialData.summary;
  const growth = calculateGrowth(totalValue.current, totalValue.previous);
  
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        formatter: function(value: number) {
          return formatCurrency(value);
        }
      },
      marker: {
        show: false
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Total Value Generated
            </h3>
            <span className="text-sm text-gray-500">
              {totalValue.periodLabel}
            </span>
          </div>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
        
        <div className="text-right mb-2">
          <div className="text-2xl font-semibold text-blue-600">
            {formatCurrency(totalValue.current)}
          </div>
          <div className={`text-sm ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Number(growth) >= 0 ? '↑' : '↓'} {Math.abs(Number(growth))}% vs. Last Period
          </div>
        </div>

        <div className="h-16">
          <ReactApexChart
            options={{
              ...chartOptions,
              colors: ['#2563eb']
            }}
            series={[{
              name: 'Value',
              data: financialData.historicalTrends.values
            }]}
            type="area"
            height="100%"
          />
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Value at Risk
            </h3>
            <span className="text-sm text-gray-500">
              {valueAtRisk.periodLabel}
            </span>
          </div>
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-semibold text-red-600">
            {formatCurrency(valueAtRisk.current)}
          </div>
          <div className="text-sm text-gray-600">
            {valueAtRisk.criticalActions} Critical Actions Required
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-800 mb-2">Risk Areas:</div>
          <div className="space-y-2">
            {valueAtRisk.riskAreas.map((area, index) => (
              <div 
                key={index}
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}