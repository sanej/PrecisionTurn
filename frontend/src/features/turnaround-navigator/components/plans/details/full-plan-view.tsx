// features/turnaround-navigator/components/plans/details/full-plan-view.tsx

import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Users, AlertTriangle, DollarSign, Shield } from 'lucide-react';
import { TurnaroundProject } from '@/features/turnaround-navigator/types/plans';


interface GeneratedPlan {
  ProjectSchedule?: {
    MajorPhases?: Array<{
      PhaseName: string;
      Duration: string;
      CriticalMilestones: string[];
      SequenceDependencies: string[];
    }>;
  };
  ResourceAllocation?: {
    RequiredPersonnel?: Array<{ Role: string; Quantity: number; Skills: string[] }>;
    EquipmentNeeds?: string[];
    SupportServices?: string[];
  };
  RiskAssessment?: {
    PotentialRisks?: Array<{
      Description: string;
      Severity: string;
      Likelihood: string;
      MitigationStrategy: string;
    }>;
  };
  BudgetBreakdown?: Record<string, number | Record<string, number>>;
  Constraints?: string[];
}

interface Plan {
  details: {
    generated_plan?: GeneratedPlan;
  };
}

interface FullPlanViewProps {
  plan: {
    details: {
      generated_plan: {
        TurnaroundProject: TurnaroundProject;
      };
    };
  };
}

const FullPlanView: React.FC<FullPlanViewProps> = ({ plan }) => {
  // Add data structure logging
  console.log('Plan details:', plan.details);
  console.log('Generated plan:', plan.details.generated_plan);

  const mappedData = useMemo(() => {
    const turnaroundProject = plan.details.generated_plan?.TurnaroundProject;
    if (!turnaroundProject) return null;

    return {
      // Timeline & Milestones
      milestones: turnaroundProject.ProjectSchedule?.Phases?.map(phase => ({
        title: phase.Name || 'Unnamed Phase',
        duration: phase.Activities?.length || 0, // Or calculate duration if needed
        deliverables: phase.Activities || [],
        milestones: phase.Milestones || []
      })) || [],

      // Resource Requirements
      resources: {
        personnel: turnaroundProject.ResourceAllocation?.Personnel?.map(p => ({
          role: p.Role || '',
          skills: p.Skills || ''
        })) || [],
        
        equipment: (turnaroundProject.ResourceAllocation?.Equipment || []).map(e => ({
          type: e,
          quantity: 1
        }))
      },

      // Risk Assessment
      risk_assessment: {
        high_risks: turnaroundProject.RiskAssessment?.Risks?.map(risk => ({
          title: risk.Description,
          description: `Severity: ${risk.Severity}, Likelihood: ${risk.Likelihood}`,
          mitigation: risk.Mitigation
        })) || []
      },

      // Cost Breakdown
      cost_breakdown: Object.entries(turnaroundProject.BudgetBreakdown || {}).map(([category, amount]) => ({
        category: category.replace(/([A-Z])/g, ' $1').trim(),
        amount: typeof amount === 'object' ? 
          Object.values(amount).reduce((sum: number, val: any) => sum + (val || 0), 0) : (amount || 0),
        details: ''
      })),

      // Safety Protocols
      safety_plan: {
        required_permits: turnaroundProject.ResourceAllocation?.SupportServices || [],
        safety_protocols: turnaroundProject.Constraints || []
      }
    };
  }, [plan.details.generated_plan]);

  if (!mappedData) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p>No plan data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline & Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Key Deliverables</TableHead>
                <TableHead>Dependencies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappedData.milestones?.map((milestone, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{milestone.title}</TableCell>
                  <TableCell>{milestone.duration} days</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {milestone.deliverables?.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {milestone.milestones?.join(', ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resource Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Resource Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Personnel</h4>
              <ul className="space-y-2">
                {mappedData.resources?.personnel?.map((p, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{p.role}</span>
                    <span className="text-gray-600">{p.skills} needed</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Equipment</h4>
              <ul className="space-y-2">
                {mappedData.resources?.equipment?.map((e, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{e.type}</span>
                    <span className="text-gray-600">{e.quantity} units</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mappedData.risk_assessment?.high_risks?.map((risk, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-700">{risk.title}</h4>
                <p className="text-sm text-red-600 mt-1">{risk.description}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Mitigation: </span>
                  <span className="text-sm">{risk.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mappedData.cost_breakdown?.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{item.category}</h4>
                <p className="text-2xl font-bold mt-2">
                  ${new Intl.NumberFormat().format(item.amount)}
                </p>
                <p className="text-sm text-gray-600 mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Required Permits</h4>
              <ul className="list-disc list-inside space-y-1">
                {mappedData.safety_plan?.required_permits?.map((permit, i) => (
                  <li key={i}>{permit}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Safety Protocols</h4>
              <ul className="list-disc list-inside space-y-1">
                {mappedData.safety_plan?.safety_protocols?.map((protocol, i) => (
                  <li key={i}>{protocol}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FullPlanView;