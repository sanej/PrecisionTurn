// features/strategic-intelligence/components/kpi-grid/kpi-grid.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { KPI } from '../../types';
import { KpiCard } from './kpi-card';
import { LoadingCard } from './loading-card';

interface KpiGridProps {
  initialData?: KPI[];
}

export function KpiGrid({ initialData }: KpiGridProps) {
  const [mounted, setMounted] = useState(false);
  const [kpis, setKpis] = useState<KPI[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    setMounted(true);
    
    if (!initialData) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // Once we have an API endpoint, fetch data here
          // For now, we'll use the static data
          setKpis(kpiData);
        } catch (error) {
          console.error('Error fetching KPI data:', error);
          setKpis([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }

    return () => setMounted(false);
  }, [initialData]);

  if (!mounted || isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (kpis.length === 0) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No KPI data available
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
