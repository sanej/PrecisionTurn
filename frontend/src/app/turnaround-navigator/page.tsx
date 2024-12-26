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
    setTimeout(() => setLatestAlert(""), 3000);
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50/30">
      <div className="max-w-[1400px] mx-auto p-4 lg:p-6 h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Turnaround Navigator
        </h1>
        
        {/* Voice Assistant Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-4">
          <div className="flex justify-between items-center">
           <VoiceAssistant 
              onRequestBriefing={handleRequestBriefing}
              latestAlert={latestAlert}
            />
          </div>
        </div>

        {/* Chat Interface - wrapped in a container with overflow control */}
        <div className="flex-1 min-h-0 bg-white rounded-lg shadow-sm">
          <ChatInterface 
            onQuery={handleQuery} 
            onGeneratePlan={generatePlan}
          />
        </div>
      </div>
    </div>
  );
}