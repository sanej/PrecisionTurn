// features/strategic-intelligence/data/kpi-data.ts
import { KPI } from '../types';

export const kpiData: KPI[] = [
  {
    id: 1,
    title: 'Total EBITDA Impact',
    value: '+$25.7M',
    trend: { value: 2.3, direction: 'up' }
  },
  {
    id: 2,
    title: 'Average NPV',
    value: '$18.3M',
    trend: { value: 1.8, direction: 'up' }
  },
  {
    id: 3,
    title: 'Average IRR',
    value: '16.5%',
    trend: { value: 0.5, direction: 'up' }
  },
  {
    id: 4,
    title: 'Total % of Revenue',
    value: '4.2%',
    trend: { value: 0, direction: 'neutral' }
  }
];