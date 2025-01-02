// features/turnaround-navigator/components/rag/chat-interface.tsx
'use client';

import { Send, Upload, Mic, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { ChartMessage } from '@/features/turnaround-navigator/types/charts';
import { SpendTrends } from '@/features/turnaround-navigator/components/charts/spend-trends';
import { useRAG } from '@/features/turnaround-navigator/hooks/useRAG';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AnswerDisplay } from './answer-display';

const LoadingIndicator = () => (
  <div className="flex items-center gap-2 p-4 bg-gray-50/50 rounded-lg">
    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
    <div className="text-sm text-gray-600 flex items-center">
      <span>Thinking</span>
      <span className="flex w-8">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
      </span>
    </div>
  </div>
);

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChartMessage[]>([{
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sender: "System",
    text: "Welcome to Turnaround Navigator. How can I assist you today?"
  }]);
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { query, isLoading, error } = useRAG();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const question = userInput.trim();
    if (!question || isLoading) return;

    setMessages(prev => [...prev, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'You',
      text: question
    }]);

    setUserInput('');

    try {
      const response = await query(question);
      
      if (response.error) {
        throw new Error(response.error);
      }

      setMessages(prev => [...prev, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'Copilot',
        text: response.answer,
        source_documents: response.source_documents
      }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setMessages(prev => [...prev, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'System',
        text: `Error: ${errorMessage}. Please try again later.`
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-lg shadow-sm mx-4">

      {/* Chat Header */}
      <div className="flex-none px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              isLoading ? "bg-yellow-500" : "bg-green-500"
            )}></div>
            <span className="font-medium">Navigator Assistant</span>
          </div>
          {error && (
            <Alert variant="destructive" className="py-1">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
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
              {message.sender}
            </div>
            <div className={cn(
              "rounded-lg px-4 py-2",
              message.sender === "You" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-900"
            )}>
              {message.sender === "Copilot" && 'source_documents' in message ? (
                <AnswerDisplay 
                  answer={message.text} 
                  sources={message.source_documents} 
                />
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <LoadingIndicator />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-none border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Ask about turnaround procedures, data, or documents..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={isLoading || !userInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center" disabled={isLoading}>
            <Mic className="h-4 w-4 mr-2" />
            Voice Input
          </Button>
          <Button variant="outline" size="sm" className="flex items-center" disabled={isLoading}>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
};