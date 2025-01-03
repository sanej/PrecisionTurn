// hooks/usePlans.ts

import { useState, useEffect } from 'react';
import { Plan, PlanDetails } from '../types/plans';

const cache = new Map();

const validatePlanData = (plan: any): boolean => {
  return Boolean(
    plan?.details?.generated_plan?.TurnaroundProject &&
    typeof plan.details.generated_plan.TurnaroundProject === 'object'
  );
};

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
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

  const getPlanById = async (id: string) => {
    if (!id) return;
    
    // Check cache first
    if (cache.has(id)) {
      const cachedPlan = cache.get(id);
      if (validatePlanData(cachedPlan)) {
        setCurrentPlan(cachedPlan);
        return cachedPlan;
      }
      // If invalid, remove from cache
      if (cachedPlan) {
        cache.delete(id);
      }
    }
  
    setIsLoadingPlan(true);
    try {
      const response = await fetch(`http://localhost:8001/api/plans/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Plan not found');
        }
        throw new Error('Failed to fetch plan');
      }
      const data = await response.json();
      setCurrentPlan(data);
      cache.set(id, data); // Cache the result
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plan');
      throw err;
    } finally {
      setIsLoadingPlan(false);
    }
  };

  const createPlan = async (details: PlanDetails) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8001/api/plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });

      if (!response.ok) throw new Error('Failed to generate plan');
      const newPlan = await response.json();
      
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
      
      // Update both the plans list and current plan if it matches
      setPlans(prev => prev.map(plan => plan.id === id ? updatedPlan : plan));
      if (currentPlan?.id === id) {
        setCurrentPlan(updatedPlan);
      }
      
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
      
      setPlans(prev => prev.filter(plan => plan.id !== id));
      if (currentPlan?.id === id) {
        setCurrentPlan(null);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plan');
      throw err;
    }
  };

  const duplicatePlan = async (plan: Plan) => {
    try {
      const duplicatedPlan: Omit<Plan, 'id'> = {
        ...plan,
        title: `${plan.title} (Copy)`,
        status: 'draft',
      };

      const response = await fetch('http://localhost:8001/api/plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicatedPlan)
      });

      if (!response.ok) throw new Error('Failed to duplicate plan');
      const newPlan = await response.json();
      
      setPlans(prev => [...prev, newPlan]);
      return newPlan;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate plan');
      throw err;
    }
  };

  return {
    plans,
    currentPlan,
    isLoading,
    isLoadingPlan,
    error,
    createPlan,
    getPlanById,
    updatePlan,
    deletePlan,
    duplicatePlan,
    refreshPlans: fetchPlans
  };
};