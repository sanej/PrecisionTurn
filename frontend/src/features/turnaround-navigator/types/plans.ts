export interface Plan {
    id: string;
    title: string;
    status: 'draft' | 'active' | 'completed';
    createdAt: string;
    updatedAt: string;
    details: PlanDetails;
  }
  
  export interface PlanDetails {
    plantType: string;
    duration: number;
    budget: number;
    scope: string;
    constraints?: string;
    resources?: ResourceAllocation[];
    milestones?: Milestone[];
  }
  
  export interface ResourceAllocation {
    type: string;
    quantity: number;
    unit: string;
  }
  
  export interface Milestone {
    title: string;
    date: string;
    status: 'pending' | 'completed';
  }