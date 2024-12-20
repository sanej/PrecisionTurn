// app/value-pulse/components/value-trackers.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Zap,
  Shield,
  Gauge,
  LucideIcon
} from 'lucide-react';
import { valueTrackerData, valueMetrics } from '@/features/value-pulse/data/value-pulse-data';


type CardType = typeof valueTrackerData.cards[0];

const iconMap: Record<CardType['type'], LucideIcon> = {
  predictive: LineChart,
  optimization: Zap,
  risk: Shield,
  efficiency: Gauge
};

const cardColors = {
  predictive: 'border-blue-600',
  optimization: 'border-green-600',
  risk: 'border-orange-600',
  efficiency: 'border-purple-600'
} as const;

const iconColors = {
  predictive: 'bg-blue-600',
  optimization: 'bg-green-600',
  risk: 'bg-orange-600',
  efficiency: 'bg-purple-600'
} as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(amount);
}

export function ValueTrackers() {
  const [cards, setCards] = useState(valueTrackerData.cards);

  useEffect(() => {
    if (!valueMetrics.realTimeUpdates) return;

    const interval = setInterval(() => {
      setCards(prevCards => 
        prevCards.map(card => ({
          ...card,
          amount: card.amount * (0.95 + Math.random() * 0.1)
        }))
      );
    }, valueMetrics.updateInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map((card) => {
        const IconComponent = iconMap[card.type];
        return (
          <Card key={card.id} className={`flex items-center p-4 ${cardColors[card.type]} border-l-4`}>
            <div className={`${iconColors[card.type]} text-white p-2 rounded-lg h-fit`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.description}</p>
              <p className="text-xl font-bold">{formatCurrency(card.amount)}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}