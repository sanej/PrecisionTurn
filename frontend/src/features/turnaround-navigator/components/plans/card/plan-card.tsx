import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  FileText, 
  MoreVertical, 
  Pencil, 
  Copy, 
  Trash2, 
  CheckCircle2,
  DollarSign // Add this import
} from 'lucide-react';
import { Plan, PlanStatus } from '../../../types/plans'; // Update the import statement
import { formatCurrency } from '@/utils/formatCurrency'; // Update the import path

const statusColors: { [key: string]: string } = {
  draft: 'bg-gray-200 text-gray-800',
  active: 'bg-blue-200 text-blue-800',
  completed: 'bg-green-200 text-green-800',
};

const getStatusColor = (status: PlanStatus) => {
  switch (status) {
    case 'draft': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-blue-100 text-blue-800';
    case 'in_progress': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDuplicate: (plan: Plan) => void;
  onDelete: (plan: Plan) => void;
  onStatusChange: (plan: Plan, status: PlanStatus) => void; // Update the prop type
  onClick: (plan: Plan) => void; // Add this prop
}

// features/turnaround-navigator/components/plans/card/plan-card.tsx
export function PlanCard({
  plan,
  onEdit,
  onDelete,
  onDuplicate,
  onStatusChange,
  onClick,
}: PlanCardProps) {
  return (
    <div 
      onClick={() => onClick(plan)}
      className={cn(
        "relative rounded-lg border bg-white shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-blue-200 cursor-pointer",
        "active:scale-[0.99] active:shadow-sm"
      )}
    >
      <div className="p-4"> {/* Reduced padding from p-6 to p-4 */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900 truncate pr-2">
            {plan.title}
          </h3>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            getStatusColor(plan.status)
          )}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{plan.details.duration} days</span>
          </div>
          <div className="flex items-center text-gray-500">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{formatCurrency(plan.details.budget)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {plan.details.scope}
        </p>

        <p className="text-xs text-gray-500 italic line-clamp-1">
          {plan.details.constraints}
        </p>
      </div>
    </div>
  );
}