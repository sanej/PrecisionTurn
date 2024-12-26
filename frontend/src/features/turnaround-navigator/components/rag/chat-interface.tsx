// features/turnaround-navigator/components/rag/chat-interface.tsx

'use client';

import { Send, Upload, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { ChartMessage } from '@/types/charts';
import { SpendTrends } from '../charts/spend-trends';

interface ChatInterfaceProps {
  onQuery: (question: string) => Promise<any>;
  onGeneratePlan: (details: string) => Promise<any>;
}

export const ChatInterface = ({ onQuery, onGeneratePlan }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChartMessage[]>([{
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sender: "System",
    text: "Welcome to Turnaround Navigator. How can I assist you today?"
  }]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    const question = userInput.trim();
    if (!question) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'You',
      text: question
    }]);

    setUserInput('');
    setIsTyping(true);

    if (question.toLowerCase().includes('spend trend')) {
      setMessages(prev => [...prev, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'Copilot',
        text: "Here's the spend ($K) trend over the last 6 months (sample data):",
        chart: {
          options: {},
          series: []
        }
      }]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await onQuery(question);
      setMessages(prev => [...prev, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'Copilot',
        text: response.answer
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'Copilot',
        text: "I'm sorry, I encountered an error processing your request."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!messages || !Array.isArray(messages)) {
    return <div>Error loading chat messages</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-4 lg:px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="font-medium">Navigator Assistant</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4"
      >
        {messages.map((message, index) => (
          <div 
            key={`${message.id}-${index}`}
            className={cn(
              "flex flex-col max-w-[90%]",
              message.sender === "You" ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className="text-sm text-gray-500 mb-1">
              {message.sender}:
            </div>
            <div className={cn(
              "rounded-lg px-4 py-2 w-full",
              message.sender === "You" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-900"
            )}>
              {message.text}
              {message.chart && (
                <div className="mt-4 bg-white rounded-lg p-4 w-full">
                  <SpendTrends />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 p-4">
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4 lg:p-6">
        <div className="flex items-center space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about turnaround procedures, data, or documents..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Mic className="h-4 w-4 mr-2" />
            Voice Input
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
};