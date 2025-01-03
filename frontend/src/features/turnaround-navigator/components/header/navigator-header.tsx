import React from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, History, MessageSquare } from 'lucide-react';

interface NavigatorHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NavigatorHeader = ({
  activeTab,
  onTabChange
}: NavigatorHeaderProps) => {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/turnaround-navigator?tab=${value}`);
    onTabChange(value);
  };

  return (
    <div className="border-b">
      <div className="px-4 lg:px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Turnaround Navigator
        </h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="assistant" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="plans" className="gap-2">
              <FileText className="h-4 w-4" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default NavigatorHeader;