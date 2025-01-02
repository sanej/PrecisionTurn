// app/turnaround-navigator/page.tsx
'use client';

import { useState } from 'react';
import NavigatorHeader from '@/features/turnaround-navigator/components/header/navigator-header';
import { ChatInterface } from '@/features/turnaround-navigator/components/rag/chat-interface';
import { PlansList } from '@/features/turnaround-navigator/components/plans/list/plans-list';
import { PlanGenerator } from '@/features/turnaround-navigator/components/plans/generator/plan-generator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRAG } from '@/features/turnaround-navigator/hooks/useRAG';
import { usePlans } from '@/features/turnaround-navigator/hooks/usePlans';

export default function TurnaroundNavigator() {
  const [activeTab, setActiveTab] = useState('assistant');
  
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  
  const { handleQuery } = useRAG();
  const { plans, createPlan, updatePlan } = usePlans();

  const handleRequestBriefing = () => {
    setLatestAlert("Daily briefing delivered.");
    setTimeout(() => setLatestAlert(""), 3000);
  };

  const handleCreatePlan = () => {
    setShowPlanGenerator(true);
  };
  

  return (
    <div className="h-screen overflow-hidden bg-gray-50/30">
      <NavigatorHeader 
        onCreatePlan={handleCreatePlan}
        onViewPlans={() => setActiveTab('plans')}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-[1400px] mx-auto p-4 lg:p-6 h-full">
        {activeTab === 'assistant' ? (
          <ChatInterface onQuery={handleQuery} />
        ) : activeTab === 'plans' ? (
          <PlansList plans={plans} onCreatePlan={handleCreatePlan} />
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
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}