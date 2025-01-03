// features/turnaround-navigator/components/plans/details/plan-details-header.tsx

import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Copy, Trash2 } from 'lucide-react';

interface PlanDetailsHeaderProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function PlanDetailsHeader({ onEdit, onDuplicate, onDelete, onBack }: PlanDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Plans
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onDuplicate}
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Duplicate
        </Button>
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}