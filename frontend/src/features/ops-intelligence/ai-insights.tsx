// components/ops-intelligence/AiInsights.tsx
import { aiInsightsData } from '@/features/ops-intelligence/data/ops-intelligence-data';

const insightStyles = {
  bottleneck: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    hover: 'hover:bg-red-100'
  },
  safety: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    hover: 'hover:bg-yellow-100'
  },
  trend: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    hover: 'hover:bg-blue-100'
  }
};

export function AiInsights() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">AI-Driven Insights</h2>
        <span className="text-sm text-gray-500">Updated {aiInsightsData.lastUpdate}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiInsightsData.insights.map((insight, index) => {
          const style = insightStyles[insight.type as keyof typeof insightStyles];
          
          return (
            <div
              key={index}
              className={`rounded-lg p-4 border-l-4 ${style.border} ${style.bg} transition-colors ${style.hover}`}
            >
              <div className="flex gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    {insight.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}