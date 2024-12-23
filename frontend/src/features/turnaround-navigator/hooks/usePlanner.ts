// features/turnaround-navigator/hooks/usePlanner.ts
import { PlanGenerationResponse } from '../types';

export const usePlanner = () => {
  const generatePlan = async (planDetails: string): Promise<PlanGenerationResponse> => {
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planDetails })
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating plan:', error);
      throw error;
    }
  };

  return { generatePlan };
};