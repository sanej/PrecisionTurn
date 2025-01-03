// app/turnaround-navigator/page.tsx
'use client';

import { useState, createContext, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import NavigatorHeader from '@/features/turnaround-navigator/components/header/navigator-header';
import { ChatInterface } from '@/features/turnaround-navigator/components/rag/chat-interface';
import { PlansList } from '@/features/turnaround-navigator/components/plans/list/plans-list';
import { PlanGenerator } from '@/features/turnaround-navigator/components/plans/generator/plan-generator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRAG } from '@/features/turnaround-navigator/hooks/useRAG';
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';
import { Plan } from '@/features/turnaround-navigator/types/plans';
import { toast } from '@/components/ui/use-toast';

export const NavigatorContext = createContext({
  activeTab: 'assistant',
  setActiveTab: (tab: string) => {}
});

export default function TurnaroundNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('assistant');
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  
  const { handleQuery } = useRAG();
  const { plans, createPlan, updatePlan, deletePlan, duplicatePlan } = usePlans();

  // Effect to sync URL with active tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['assistant', 'plans', 'history'].includes(tab)) {
      setActiveTab(tab);
    } else if (pathname.includes('/plans/')) {
      setActiveTab('plans');
    }
  }, [pathname, searchParams]);

  // Handle tab change with URL update
  const handleTabChange = (tab: string) => {
    const newUrl = `/turnaround-navigator?tab=${tab}`;
    router.push(newUrl);
    setActiveTab(tab);
  };

  const handleCreatePlan = () => {
    setShowPlanGenerator(true);
  };

  const handleEditPlan = async (plan: Plan) => {
    try {
      router.push(`/turnaround-navigator/plans/${plan.id}?tab=plans`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit plan",
        variant: "destructive"
      });
    }
  };

  const handleDeletePlan = async (plan: Plan) => {
    try {
      await deletePlan(plan.id);
      toast({
        title: "Success",
        description: "Plan deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive"
      });
    }
  };

  const handleDuplicatePlan = async (plan: Plan) => {
    try {
      await duplicatePlan(plan);
      toast({
        title: "Success",
        description: "Plan duplicated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate plan",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (plan: Plan, newStatus: 'draft' | 'active' | 'completed') => {
    try {
      await updatePlan(plan.id, { ...plan, status: newStatus });
      toast({
        title: "Success",
        description: "Plan status updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update plan status",
        variant: "destructive"
      });
    }
  };

  return (
    <NavigatorContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="h-screen overflow-hidden bg-gray-50/30">
        <NavigatorHeader 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="max-w-[1400px] mx-auto p-4 lg:p-6 h-full">
          {activeTab === 'assistant' ? (
            <ChatInterface onQuery={handleQuery} />
          ) : activeTab === 'plans' ? (
            <PlansList 
              plans={plans}
              onCreatePlan={handleCreatePlan}
              onEditPlan={handleEditPlan}
              onDeletePlan={handleDeletePlan}
              onDuplicatePlan={handleDuplicatePlan}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div>History View (Coming Soon)</div>
          )}
        </div>

        <Dialog open={showPlanGenerator} onOpenChange={setShowPlanGenerator}>
          <DialogContent className="max-w-4xl">
            <PlanGenerator 
              onClose={() => setShowPlanGenerator(false)}
              onPlanCreated={(plan) => {
                createPlan(plan);
                setShowPlanGenerator(false);
                toast({
                  title: "Success",
                  description: "Plan created successfully"
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </NavigatorContext.Provider>
  );
}