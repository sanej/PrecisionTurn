// components/plans/plan-generator.tsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
//import { usePlanGeneration } from '../../hooks/usePlanGeneration';
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
});

type PlanFormValues = z.infer<typeof planSchema>;

interface PlanGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (plan: any) => void;
}

export const PlanGenerator = ({ isOpen, onClose, onPlanCreated }: PlanGeneratorProps) => {
  const { generatePlan, isGenerating, error } = usePlans();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: '',
      plantType: '',
      duration: undefined as unknown as number, // Handle undefined initially
      budget: undefined as unknown as number,   // Handle undefined initially
      scope: '',
      constraints: '',
    },
  });

  const onSubmit = async (values: PlanFormValues) => {
    try {
      const response = await fetch('http://localhost:8001/api/plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const generatedPlan = await response.json();
      onPlanCreated(generatedPlan);
      onClose();
    } catch (error) {
      console.error('Error generating plan:', error);
      // Handle error appropriately
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Turnaround Plan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <select 
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="">Select Plant Type</option>
                        <option value="refinery">Refinery</option>
                        <option value="petrochemical">Petrochemical</option>
                        <option value="power">Power Plant</option>
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
                    <FormLabel>Expected Duration (days)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        value={field.value || ''} // Handle empty/NaN values
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

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (USD)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      value={field.value || ''} // Handle empty/NaN values
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
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="constraints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Constraints</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Weather, regulations, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};