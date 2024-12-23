// src/app/turnaround-navigator/page.tsx
'use client';

import { useState } from 'react';
import { ChatInterface } from '@/features/turnaround-navigator/components/rag/chat-interface';
import { VoiceAssistant } from '@/features/turnaround-navigator/components/voice/voice-assistant';
import { useRAG } from '@/features/turnaround-navigator/hooks/useRAG';
import { usePlanner } from '@/features/turnaround-navigator/hooks/usePlanner';

export default function TurnaroundNavigator() {
  const [latestAlert, setLatestAlert] = useState('');
  const { handleQuery } = useRAG();
  const { generatePlan } = usePlanner();

  const handleRequestBriefing = () => {
    setLatestAlert("Daily briefing delivered.");
    // Add audio briefing logic here
    setTimeout(() => setLatestAlert(""), 17000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50/30">
      <div className="flex-grow overflow-hidden p-6">
        <h1 className="text-2xl font-semibold mb-6">Turnaround Navigator</h1>
        
        <div className="mb-6">
          <VoiceAssistant 
            onRequestBriefing={handleRequestBriefing}
            latestAlert={latestAlert}
          />
        </div>

        <ChatInterface 
          onQuery={handleQuery} 
          onGeneratePlan={generatePlan}
        />
      </div>
    </div>
  );
}