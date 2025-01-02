import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, BookOpen } from 'lucide-react';

interface PlanActionsProps {
  onCreatePlan: () => void;
  onImportPlan: () => void;
  onViewTemplates: () => void;
}

export const PlanActions = ({
  onCreatePlan,
  onImportPlan,
  onViewTemplates
}: PlanActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={onCreatePlan}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Plan
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onImportPlan}
      >
        <Upload className="w-4 h-4 mr-2" />
        Import Plan
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onViewTemplates}
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Templates
      </Button>
    </div>
  );
};