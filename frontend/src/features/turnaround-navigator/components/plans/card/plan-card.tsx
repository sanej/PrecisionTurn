import React from 'react';
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
  CheckCircle2 
} from 'lucide-react';
import { Plan } from '../../../types/plans';

interface PlanCardProps {
  plan: Plan;
  onEdit?: (plan: Plan) => void;
  onDuplicate?: (plan: Plan) => void;
  onDelete?: (plan: Plan) => void;
  onStatusChange?: (plan: Plan, status: 'draft' | 'active' | 'completed') => void;
}

const statusColors = {
  draft: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800'
};

export const PlanCard = ({ 
  plan,
  onEdit,
  onDuplicate,
  onDelete,
  onStatusChange
}: PlanCardProps) => {
  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking dropdown
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer relative" onClick={() => onEdit?.(plan)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          {/* Status Label */}
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[plan.status]}`}
          >
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>

          {/* Title */}
          <h3 className="font-medium text-lg text-center truncate flex-1 mx-2">
            {plan.title}
          </h3>

          {/* Action Menu */}
          <div className="relative" onClick={handleDropdownClick}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(plan)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDuplicate && (
                  <DropdownMenuItem onClick={() => onDuplicate(plan)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                )}
                {onStatusChange && plan.status !== 'completed' && (
                  <DropdownMenuItem onClick={() => onStatusChange(plan, 'completed')}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(plan);
                    }}
                    className="text-red-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{plan.details.duration} days</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>{formatBudget(plan.details.budget)}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="line-clamp-2">{plan.details.scope}</p>
          </div>

          {plan.details.constraints && (
            <div className="text-sm text-gray-500 italic">
              <p className="line-clamp-1">
                Constraints: {plan.details.constraints}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
