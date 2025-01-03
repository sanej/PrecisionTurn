// types/plans.ts

export interface Plan {
    id: string;
    title: string;
    status: PlanStatus;
    createdAt: string;
    updatedAt: string;
    details: PlanDetails;
}

export type PlanStatus = 'draft' | 'approved' | 'in_progress' | 'completed';

export interface PlanDetails {
    plantType: string;
    duration: number;
    budget: number;
    scope: string;
    constraints?: string;
    scope_analysis?: {
        benchmark_comparison: number;
        recommendations: string[];
        is_realistic: boolean;
    };
    riskLevel: string;
    generated_plan: GeneratedPlan;
}

// Update TurnaroundProject interface
export interface TurnaroundProject {
    ProjectSchedule: {
        Phases: Phase[];
    };
    ResourceAllocation: ResourceAllocation;
    RiskAssessment: {
        Risks: Risk[];
    };
    BudgetBreakdown: {
        LaborCosts: Record<string, number>;
        EquipmentCosts: number;
        MaterialCosts: number;
        Contingency: number;
    };
    Constraints: string[];
    PlantType: string;
    Title: string;
    Duration: number;
    Budget: number;
}

// Define new interfaces
export interface Phase {
    Name: string;
    Activities: string[];
    Milestones: string[];
}

export interface Risk {
    Description: string;
    Severity: number;
    Likelihood: number;
    Mitigation: string;
}

export interface Personnel {
    Role: string;
    Skills: string;
}

export interface ResourceAllocation {
    Personnel: Personnel[];
    Equipment: string[];
    SupportServices: string[];
    Materials: string[];
}

export interface GeneratedPlan {
    milestones?: Milestone[];
    resources?: {
        personnel?: PersonnelResource[];
        equipment?: EquipmentResource[];
    };
    risk_assessment?: {
        high_risks?: Risk[];
    };
    cost_breakdown?: CostItem[];
    safety_plan?: {
        required_permits?: string[];
        safety_protocols?: string[];
    };
}

export interface Milestone {
    title: string;
    duration: number;
    deliverables?: string[];
    dependencies?: string[];
}

export interface PersonnelResource {
    role: string;
    count: number;
}

export interface EquipmentResource {
    type: string;
    quantity: number;
}

export interface Risk {
    title: string;
    description: string;
    mitigation: string;
}

export interface CostItem {
    category: string;
    amount: number;
    details: string;
}