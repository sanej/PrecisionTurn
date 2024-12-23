// src/features/turnaround-navigator/components/voice/voice-assistant.tsx

import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Card from '@/components/ui/card';

interface VoiceAssistantProps {
  onRequestBriefing: () => void;
  latestAlert?: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  onRequestBriefing, 
  latestAlert 
}) => {
  return (
    <Card.Card className="w-full">
      <Card.CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Card.CardTitle className="text-xl">Voice Assistant</Card.CardTitle>
            <Card.CardDescription>Get audio briefings and voice-based assistance</Card.CardDescription>
          </div>
          <Button 
            onClick={onRequestBriefing} 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Mic className="w-4 h-4 mr-2" />
            Request Audio Briefing
          </Button>
        </div>
      </Card.CardHeader>
      {latestAlert && (
        <Card.CardContent>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <p className="text-sm text-gray-700">{latestAlert}</p>
          </div>
        </Card.CardContent>
      )}
    </Card.Card>
  );
};