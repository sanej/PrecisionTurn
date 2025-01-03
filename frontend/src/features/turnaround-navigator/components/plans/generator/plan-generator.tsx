// components/plans/generator/plan-generator.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, AlertCircle } from 'lucide-react';
import * as z from 'zod';
import { usePlans } from '../../../hooks/usePlans';

const planSchema = z.object({
  title: z.string().min(1, "Title is required"),
  plantType: z.string().min(1, "Plant type is required"),
  duration: z.union([
    z.string().transform((val) => parseInt(val, 10)),
    z.number()
  ]).refine((val) => val > 0, "Duration must be at least 1 day"),
  budget: z.union([
    z.string().transform((val) => parseFloat(val)),
    z.number()
  ]).refine((val) => val >= 0, "Budget must be a positive number"),
  scope: z.string().min(10, "Please provide more detail about the scope"),
  constraints: z.string().optional(),
  objectives: z.string().optional(),
  team: z.string().optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
});

type PlanFormValues = z.infer<typeof planSchema>;

interface PlanGeneratorProps {
  onClose: () => void;
  onPlanCreated: (plan: any) => void;
}

export const PlanGenerator = ({ onClose, onPlanCreated }: PlanGeneratorProps) => {
  const { generatePlan, isGenerating } = usePlans();
  const [showAIInsights, setShowAIInsights] = React.useState(false);

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: '',
      plantType: '',
      duration: undefined as unknown as number,
      budget: undefined as unknown as number,
      scope: '',
      constraints: '',
      objectives: '',
      team: '',
      riskLevel: 'medium',
    },
  });

  const onSubmit = async (values: PlanFormValues) => {
    try {
      const response = await generatePlan(values);
      onPlanCreated(response);
      onClose();
    } catch (error) {
      console.error('Error generating plan:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <DialogHeader className="mb-4">
        <DialogTitle>Create New Turnaround Plan</DialogTitle>
        <DialogDescription>
          Fill in the details below to generate a new turnaround plan.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter plan title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="plantType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plant Type</FormLabel>
                      <FormControl>
                        <select className="w-full p-2 border rounded" {...field}>
                          <option value="">Select Plant Type</option>
                          <option value="refinery">Refinery</option>
                          <option value="petrochemical">Petrochemical</option>
                          <option value="power">Power Plant</option>
                          <option value="chemical">Chemical Plant</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (days)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          value={field.value || ''} 
                          onChange={(e) => {
                            const value = e.target.value ? parseInt(e.target.value, 10) : '';
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (USD)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter budget amount"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value ? parseFloat(e.target.value) : '';
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the scope of work..."
                        className="h-24 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints & Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter any constraints or special requirements..."
                        className="h-20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Objectives</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter key objectives..."
                        className="h-20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="riskLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Level</FormLabel>
                    <FormControl>
                      <select className="w-full p-2 border rounded" {...field}>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          {showAIInsights && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">AI Insights</h4>
              </div>
              <ul className="text-sm space-y-2">
                <li>• Similar turnarounds typically take 40-50 days</li>
                <li>• Recommended budget range: $45M - $55M</li>
                <li>• Key risks: Weather delays, Equipment availability</li>
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAIInsights(!showAIInsights)}
            >
              {showAIInsights ? 'Hide AI Insights' : 'Show AI Insights'}
            </Button>

            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Plan'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};