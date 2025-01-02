// hooks/usePlans.ts
import { useState, useEffect } from 'react';
import { Plan, PlanDetails } from '../types/plans';

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8001/api/plans');
      if (!response.ok) throw new Error('Failed to fetch plans');
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plans');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlan = async (details: PlanDetails) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8001/api/plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });

      if (!response.ok) throw new Error('Failed to generate plan');
      const newPlan = await response.json();
      
      // Update local state
      setPlans(prev => [...prev, newPlan]);
      return newPlan;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate plan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlan = async (id: string, updates: Partial<Plan>) => {
    try {
      const response = await fetch(`http://localhost:8001/api/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update plan');
      const updatedPlan = await response.json();
      
      // Update local state
      setPlans(prev => prev.map(plan => 
        plan.id === id ? updatedPlan : plan
      ));
      return updatedPlan;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plan');
      throw err;
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8001/api/plans/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete plan');
      
      // Update local state
      setPlans(prev => prev.filter(plan => plan.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plan');
      throw err;
    }
  };

  return {
    plans,
    isLoading,
    error,
    generatePlan,
    updatePlan,
    deletePlan,
    refreshPlans: fetchPlans
  };
};