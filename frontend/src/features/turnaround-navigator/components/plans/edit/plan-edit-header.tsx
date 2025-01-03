// features/turnaround-navigator/components/plans/edit/plan-edit-header.tsx

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PlanEditHeaderProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export function PlanEditHeader({ onSave, onCancel, isSaving }: PlanEditHeaderProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/turnaround-navigator');  // Updated to go to plans list
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={handleCancel}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Cancel
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Discard Changes
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}