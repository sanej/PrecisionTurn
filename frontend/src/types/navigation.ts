// types/navigation.ts
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
  }
  
  export interface NavSection {
    title?: string;
    items: NavItem[];
  }
  
  // types/dashboard.ts
  export interface PerformanceData {
    overall: number;
    cost: number;
    schedule: number;
    safety: number;
    quality: number;
  }
  
  export interface CostData {
    week: number;
    actualCost: number;
    budget: number;
    forecast?: number;
  }
  
  export interface ScheduleProgress {
    phase: string;
    completed: number;
    remaining: number;
    total: number;
  }
  
  export interface SafetyData {
    week: number;
    trir: number;
    industryAverage: number;
  }