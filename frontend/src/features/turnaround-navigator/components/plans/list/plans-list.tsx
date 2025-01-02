import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlanCard } from "../card/plan-card";
import { PlanGenerator } from "../generator/plan-generator";
import { PlanActions } from "../actions/plan-actions";
import { Plan } from "../../../types/plans";
import { Search, Filter, SortAsc, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PlansListProps {
  plans: Plan[];
  onEditPlan: (plan: Plan) => void;
  onDeletePlan: (plan: Plan) => void;
  onDuplicatePlan: (plan: Plan) => void;
  onStatusChange: (plan: Plan, status: "draft" | "active" | "completed") => void;
}

export const PlansList = ({
  plans,
  onEditPlan,
  onDeletePlan,
  onDuplicatePlan,
  onStatusChange,
}: PlansListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "title" | "budget">("date");
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [localPlans, setLocalPlans] = useState<Plan[]>(plans);

  const handleCreatePlan = () => {
    setIsGeneratorOpen(true);
  };

  const handleImportPlan = () => {
    console.log("Import Plan clicked");
  };

  const handleViewTemplates = () => {
    console.log("View Templates clicked");
  };

  const filteredAndSortedPlans = useMemo(() => {
    return localPlans
      .filter((plan) => {
        const matchesSearch =
          plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.details.scope.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || plan.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          case "title":
            return a.title.localeCompare(b.title);
          case "budget":
            return b.details.budget - a.details.budget;
          default:
            return 0;
        }
      });
  }, [localPlans, searchQuery, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header with PlanActions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Turnaround Plans</h2>
        <PlanActions
          onCreatePlan={handleCreatePlan}
          onImportPlan={handleImportPlan}
          onViewTemplates={handleViewTemplates}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Turnaround Plan</DialogTitle>
          </DialogHeader>
          <PlanGenerator 
            onClose={() => setIsGeneratorOpen(false)}
            onPlanCreated={(plan) => {
              setLocalPlans(prev => [...prev, plan]);
              setIsGeneratorOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: "date" | "title" | "budget") => setSortBy(value)}>
            <SelectTrigger className="w-[140px]">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest First</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredAndSortedPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => onEditPlan(plan)}
              onDelete={() => onDeletePlan(plan)}
              onDuplicate={() => onDuplicatePlan(plan)}
              onStatusChange={(plan, newStatus) => onStatusChange(plan, newStatus)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || statusFilter !== "all" ? "No plans match your filters" : "No plans created yet"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first turnaround plan"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Button onClick={() => setIsGeneratorOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Plan
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
