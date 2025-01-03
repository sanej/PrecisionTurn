import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Calendar,
  Clock,
  DollarSign,
  Target,
  AlertTriangle,
  Users,
  CheckCircle2,
  Wrench // Updated icon name
} from 'lucide-react';
import { Plan } from '@/features/turnaround-navigator/types/plans';

interface PlanSummaryProps {
  plan: Plan;
  variant?: 'default' | 'compact';
}

export const PlanSummary = ({ plan, variant = 'default' }: PlanSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(plan.updatedAt)}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium 
            ${plan.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
              plan.status === 'active' ? 'bg-green-100 text-green-800' : 
              'bg-blue-100 text-blue-800'}`}
          >
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {variant === 'compact' ? (
          // Compact view
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>{plan.details.duration} days</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span>{formatCurrency(plan.details.budget)}</span>
              </div>
            </div>
            <p className="text-gray-600">{plan.details.scope}</p>
          </div>
        ) : (
          // Default detailed view
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="overview">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Overview
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                    <p className="text-lg">{plan.details.duration} days</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Budget</h4>
                    <p className="text-lg">{formatCurrency(plan.details.budget)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Plant Type</h4>
                    <p className="text-lg">{plan.details.plantType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Created</h4>
                    <p className="text-lg">{formatDate(plan.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Scope</h4>
                  <p className="text-gray-700">{plan.details.scope}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {plan.details.milestones && plan.details.milestones.length > 0 && (
              <AccordionItem value="milestones">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Milestones
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {plan.details.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(milestone.date)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${milestone.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                          {milestone.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {plan.details.resources && plan.details.resources.length > 0 && (
              <AccordionItem value="resources">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    Resources
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {plan.details.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{resource.type}</span>
                        <span>{resource.quantity} {resource.unit}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {plan.details.constraints && (
              <AccordionItem value="constraints">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Constraints & Considerations
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{plan.details.constraints}</p>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};