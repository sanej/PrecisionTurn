// features/turnaround-navigator/components/rag/chat-interface.tsx

'use client';

import { Send, Upload, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChatMessage } from '@/types/index';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChatInterfaceProps {
  onQuery: (question: string) => Promise<any>;
  onGeneratePlan: (details: string) => Promise<any>;
}

export const ChatInterface = ({ onQuery, onGeneratePlan }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: Date.now(),
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
      id: Date.now(),
      sender: 'You',
      text: question
    }]);

    setUserInput('');
    setIsTyping(true);

    if (question.toLowerCase().includes('spend trend')) {
      // Add spend trend chart
      const chartOptions = {
        chart: {
          type: 'line',
          toolbar: { show: false }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']
        },
        colors: ['#008FFB']
      };

      const chartSeries = [{
        name: 'Spend in $K',
        data: [300, 450, 720, 980, 1250, 1500]
      }];

      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'Navigator',
        text: "Here's the spend trend over the last 6 months:",
        chart: {
          options: chartOptions,
          series: chartSeries
        }
      }]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await onQuery(question);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'Navigator',
        text: response.answer
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'Navigator',
        text: "I'm sorry, I encountered an error processing your request."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-300px)] bg-white rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="font-medium">Navigator Assistant</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex flex-col max-w-[80%]",
              message.sender === "You" ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className={cn(
              "rounded-lg px-4 py-2",
              message.sender === "You" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-900"
            )}>
              {message.text}
              {message.chart && (
                <div className="mt-4 bg-white rounded-lg p-4">
                  <ApexChart
                    options={message.chart.options}
                    series={message.chart.series}
                    type="line"
                    height={300}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex space-x-2 p-4">
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about turnaround procedures, data, or documents..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button variant="ghost" size="sm">
            <Mic className="h-4 w-4 mr-2" />
            Voice Input
          </Button>
        </div>
      </div>
    </div>
  );
};