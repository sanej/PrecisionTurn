import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, History } from 'lucide-react';

interface NavigatorHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NavigatorHeader = ({
  activeTab,
  onTabChange
}: NavigatorHeaderProps) => {
  return (
    <div className="border-b">
      <div className="px-4 lg:px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Turnaround Navigator
        </h1>
        
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="assistant">
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="plans">
              <FileText className="w-4 h-4 mr-2" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default NavigatorHeader;