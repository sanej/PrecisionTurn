// features/strategic-intelligence/types.ts
export interface KPI {
    id: number;
    title: string;
    value: string;
    trend: {
      value: number;
      direction: 'up' | 'down' | 'neutral';
    };
  }