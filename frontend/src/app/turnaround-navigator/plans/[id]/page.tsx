// app/turnaround-navigator/plans/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast'; 

// Project speific custom imports
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';
import { PlanDetails } from '@/features/turnaround-navigator/components/plans/details/plan-details';


export default function PlanPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast(); // Get toast function from useToast hook
  const { getPlanById, currentPlan, isLoadingPlan, error } = usePlans();

  useEffect(() => {
    let mounted = true;
  
    const loadPlan = async () => {
      try {
        const id = typeof params?.id === 'string' ? params.id : '';
        if (!id || !mounted) return;
        
        await getPlanById(id);
      } catch (err) {
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
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!currentPlan) {
    return null;
  }

  return <PlanDetails plan={currentPlan} />;
}