// features/turnaround-navigator/types/index.ts

export interface ChatMessage {
    id: number;
    sender: string;
    text: string;
    chart?: {
      options: ApexCharts.ApexOptions;
      series: ApexAxisChartSeries;
    };
    planSummary?: PlanSummary;
    fullPlan?: string;
    showFullPlan?: boolean;
  }
  
  export interface PlanSummary {
    Duration?: string;
    "Start Date"?: string;
    "Major Phases"?: number;
    "Estimated Budget"?: string;
    [key: string]: string | number | undefined;
  }
  
  export interface RAGResponse {
    answer: string;
    error?: string;
  }
  
  export interface PlanGenerationResponse {
    plan: {
      Project_Overview: {
        Duration: string;
        Estimated_Budget: string;
      };
      Key_Milestones: any[];
      Detailed_Task_Breakdown: {
        Start_Date: string;
        [key: string]: any;
      }[];
    };
  }