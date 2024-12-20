
// features/strategic-intelligence/components/ai-insights.tsx

import { useState, useCallback, memo } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightProps {
  type: 'pattern' | 'risk' | 'optimization';
  title: string;
  message: string;
  confidence: number;
  impact: string;
}

const InsightCard = memo(({ type, title, message, confidence, impact }: InsightProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = {
    pattern: TrendingUp,
    risk: AlertTriangle,
    optimization: Zap
  }[type];

  const colors = {
    pattern: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    risk: 'bg-red-50 hover:bg-red-100 border-red-200',
    optimization: 'bg-green-50 hover:bg-green-100 border-green-200'
  }[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'rounded-lg p-4 border cursor-pointer transition-all',
        colors,
        isExpanded ? 'shadow-md' : 'shadow-sm'
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-white/50 px-2 py-0.5 rounded-full">
            {confidence}% confidence
          </span>
          <ChevronRight 
            className={cn(
              "w-4 h-4 transition-transform",
              isExpanded ? "rotate-90" : ""
            )}
          />
        </div>
      </div>

      <motion.div
        animate={{ height: isExpanded ? 'auto' : '0' }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-2 flex justify-between items-center text-sm">
          <span className="font-medium">Impact: {impact}</span>
          <button className="text-blue-600 hover:underline">
            View Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

export function AiInsights() {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'pattern',
      title: 'Efficiency Pattern Detected',
      message: 'Plant C showing 15% higher efficiency in maintenance spend compared to other plants.',
      confidence: 92,
      impact: 'High'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Critical Risk Alert',
      message: 'Equipment failure probability increased by 23% in Plant E. Immediate inspection recommended.',
      confidence: 88,
      impact: 'Critical'
    },
    {
      id: 3,
      type: 'optimization',
      title: 'Cost Optimization',
      message: 'Potential $2.3M savings identified by applying Plant C maintenance practices to Plant B.',
      confidence: 85,
      impact: 'Medium'
    }
  ]);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">AI-Driven Insights</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            Last updated: 5m ago
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {insights.map((insight) => (
            <InsightCard key={insight.id} {...insight} />
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}