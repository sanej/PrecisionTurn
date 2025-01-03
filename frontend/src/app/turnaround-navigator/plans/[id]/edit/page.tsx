// app/turnaround-navigator/plans/[id]/edit/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';
import { PlanEdit } from '@/features/turnaround-navigator/components/plans/edit/plan-edit';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Breadcrumb } from '@/components/ui/breadcrumb';


export default function PlanEditPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { getPlanById, currentPlan, isLoadingPlan, error } = usePlans();

  <Breadcrumb 
    items={[
      { label: 'Plans', href: '/turnaround-navigator' },
      { label: currentPlan?.title || 'Plan Details', href: `/turnaround-navigator/plans/${params.id}` },
      { label: 'Edit' }
    ]} 
  />

  useEffect(() => {
    let mounted = true;

    const loadPlan = async () => {
      try {
        const id = typeof params?.id === 'string' ? params.id : '';
        if (!id || !mounted) return;
        
        console.log('Loading plan:', id); // Debug log
        await getPlanById(id);
      } catch (err) {
        console.error('Error loading plan:', err); // Debug log
        if (mounted) {
          toast({
            title: "Error",
            description: "Failed to load plan. Redirecting to plans list...",
            variant: "destructive",
          });
          setTimeout(() => router.push('/turnaround-navigator'), 2000);
        }
      }
    };
    
    loadPlan();

    return () => {
      mounted = false;
    };
  }, [params?.id, getPlanById, router, toast]);

  if (isLoadingPlan) {
    console.log('Loading state'); // Debug log
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error) {
    console.error('Error state:', error); // Debug log
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!currentPlan) {
    console.log('No plan available'); // Debug log
    return (
      <div className="p-6">
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          No plan found.
        </div>
      </div>
    );
  }

  console.log('Rendering PlanEdit with plan:', currentPlan); // Debug log
  return <PlanEdit plan={currentPlan} />;
}