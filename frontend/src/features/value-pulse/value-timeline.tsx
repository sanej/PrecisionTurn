// app/value-pulse/components/value-timeline.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { timelineData, valueMetrics } from '@/features/value-pulse/data/value-pulse-data';
import { AlertCircle, TrendingUp, Shield } from 'lucide-react';

const icons = {
  savings: TrendingUp,
  optimization: Shield,
  risk: AlertCircle
};

const markerColors = {
  savings: 'bg-green-600',
  optimization: 'bg-blue-600',
  risk: 'bg-red-600'
};

const valueColors = {
  savings: 'text-green-600',
  optimization: 'text-blue-600',
  risk: 'text-red-600'
};

const severityStyles = {
  high: 'bg-red-50',
  medium: 'bg-yellow-50',
  low: 'bg-blue-50'
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', valueMetrics.formatting.currency).format(amount);
}

export function ValueTimeline() {
  const [timeRange, setTimeRange] = useState<string>('24h');
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Value Impact Timeline
        </h2>
        
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1.5 bg-white border rounded-md text-sm text-gray-600"
        >
          {timelineData.filters.timeRanges.map(range => (
            <option key={range} value={range}>Last {range}</option>
          ))}
        </select>
      </div>
      
      <div className="space-y-4">
        {timelineData.events.map((event) => {
          const Icon = icons[event.type];
          
          return (
            <div 
              key={event.id} 
              className={`flex gap-4 p-3 rounded-lg ${severityStyles[event.severity]} transition-all duration-200 hover:shadow-sm`}
            >
              <div className="text-sm text-gray-500 w-24 flex-shrink-0">
                {event.time}
              </div>
              
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${markerColors[event.type]}`} />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-1">
                      {event.action}
                    </div>
                    <div className={`text-sm ${valueColors[event.type]}`}>
                      {event.valueText}
                    </div>
                  </div>
                  <Icon className={`h-5 w-5 ${valueColors[event.type]} flex-shrink-0`} />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Location: {event.location}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}