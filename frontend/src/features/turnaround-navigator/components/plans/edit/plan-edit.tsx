// features/turnaround-navigator/components/plans/edit/plan-edit.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/features/turnaround-navigator/types/plans';
import { PlanEditHeader } from './plan-edit-header';
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PlanEditProps {
  plan: Plan;
}

export function PlanEdit({ plan }: PlanEditProps) {
  const router = useRouter();
  const { updatePlan } = usePlans();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(plan);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (['approved', 'completed'].includes(plan.status)) {
      toast({
        title: "Error",
        description: "Cannot edit approved or completed plans",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updatePlan(plan.id, formData);
      toast({
        title: "Success",
        description: "Plan updated successfully",
      });
      router.push(`/turnaround-navigator/plans/${plan.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update plan",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <PlanEditHeader 
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      />
      
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Edit Plan Details</h2>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="draft">Draft</option>
                <option value="approved">Approved</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* Add more fields as necessary */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}