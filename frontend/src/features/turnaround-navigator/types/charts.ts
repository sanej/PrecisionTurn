// features/turnaround-navigator/types/charts.ts

export interface SpendTrendData {
    month: string;
    spend: number;
  }
  
  export interface ChartConfig {
    data: SpendTrendData[];
    options?: any;
  }
  
  export interface ChartMessage {
    id: string;
    sender: string;
    text: string;
    chart?: {
      options: any;
      series: any[];
    };
  }