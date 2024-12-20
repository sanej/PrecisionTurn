import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '../../types';

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  neutral: 'text-gray-600'
} as const;

const TrendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus
} as const;

interface KpiCardProps {
  kpi: KPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const Icon = TrendIcon[kpi.trend.direction];
  
  return (
    <Card className="p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600">
        {kpi.title}
      </h3>
      <div className="mt-2 flex justify-between items-end">
        <div className="text-2xl font-semibold">
          {kpi.value}
        </div>
        <div className={`flex items-center gap-1 ${trendColors[kpi.trend.direction]}`}>
          <Icon className="h-4 w-4" />
          <span className="text-sm">
            {kpi.trend.value}%
          </span>
        </div>
      </div>
    </Card>
  );
}