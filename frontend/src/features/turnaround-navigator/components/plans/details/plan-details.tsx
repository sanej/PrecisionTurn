// features/turnaround-navigator/components/plans/details/plan-details.tsx

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Plan } from '@/features/turnaround-navigator/types/plans';
import { PlanSummary } from '@/features/turnaround-navigator/components/plans/summary/plan-summary';
import { Button } from '@/components/ui/button';
import { PlanDetailsHeader } from './plan-details-header';
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';
import { useToast } from '@/components/ui/use-toast';
import { FaCheckCircle } from 'react-icons/fa';
import FullPlanView from './full-plan-view';
import { NavigatorContext } from '@/app/turnaround-navigator/page';

interface PlanDetailsProps {
  plan: Plan;
}

export function PlanDetails({ plan }: PlanDetailsProps) {
  const router = useRouter();
  const { setActiveTab } = useContext(NavigatorContext);
  const { deletePlan, duplicatePlan, updatePlan } = usePlans();
  const { toast } = useToast();

  const handleEdit = () => {
    router.push(`/turnaround-navigator/plans/${plan.id}/edit`);
  };

  const handleDuplicate = async () => {
    try {
      await duplicatePlan(plan);
      toast({
        title: "Success",
        description: "Plan duplicated successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate plan",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async () => {
    try {
      await updatePlan(plan.id, {
        ...plan,
        status: 'approved',
        updatedAt: new Date().toISOString()
      });
      toast({
        title: "Success",
        description: "Plan approved successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve plan",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlan(plan.id);
      toast({
        title: "Success",
        description: "Plan deleted successfully",
      });
      setActiveTab('plans');
      router.push('/turnaround-navigator');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    // Navigate back to plans tab
    router.push('/turnaround-navigator?tab=plans');
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <PlanDetailsHeader 
        onBack={handleBack}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
      {plan.status === 'draft' && (
        <Button
          onClick={handleApprove}
          className="flex items-center gap-2"
        >
          <FaCheckCircle className="w-4 h-4" />
          Approve Plan
        </Button>
      )}
      <div className="mb-6">
        <PlanSummary plan={plan} />
      </div>
      <div>
        <FullPlanView plan={plan} />
      </div>
    </div>
  );
}