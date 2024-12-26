// app/components/strategic-intelligence/components/scenario-planning.tsx

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { scenarioPlanningData } from '@/features/strategic-intelligence/data/strategic-intelligence-data';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

interface ScenarioResult {
  ebitdaImpact: number;
  riskChange: number;
  costSavings: number;
  scheduleImpact: number;
}

export function ScenarioPlanning() {
  const [selectedPlant, setSelectedPlant] = useState(scenarioPlanningData.plants[0]);
  const [budget, setBudget] = useState(0);
  const [timeline, setTimeline] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ScenarioResult | null>(null);

  const calculateScenarioImpact = (budget: number, timeline: number): ScenarioResult => {
    return {
      ebitdaImpact: budget * 1.2,
      riskChange: timeline * 0.5,
      costSavings: budget < 0 ? Math.abs(budget * 0.8) : 0,
      scheduleImpact: timeline
    };
  };

  const handleSimulation = async () => {
    setIsLoading(true);
    setResults(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newResults = calculateScenarioImpact(budget, timeline);
    setResults(newResults);
    setIsLoading(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Interactive Scenario Planning
      </h2>

      <div className="space-y-6">
        {/* Plant Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Select Plant</label>
          <select
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="w-full px-3 py-2 bg-white border rounded-md text-gray-700"
            title="Select Plant"
          >
            {scenarioPlanningData.plants.map((plant) => (
              <option key={plant} value={plant}>{plant}</option>
            ))}
          </select>
        </div>

        {/* Budget Slider */}
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">
            Budget Adjustment
          </label>
          <input
            type="range"
            min={scenarioPlanningData.controls.budget.min}
            max={scenarioPlanningData.controls.budget.max}
            step={scenarioPlanningData.controls.budget.step}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full"
            title="Budget Adjustment"
          />
          <div className="text-sm text-gray-600 text-right">{budget}%</div>
        </div>

        {/* Timeline Slider */}
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">
            Timeline Shift
          </label>
          <input
            type="range"
            min={scenarioPlanningData.controls.timeline.min}
            max={scenarioPlanningData.controls.timeline.max}
            step={scenarioPlanningData.controls.timeline.step}
            value={timeline}
            onChange={(e) => setTimeline(Number(e.target.value))}
            className="w-full"
            title="timelineShift"
          />
          <div className="text-sm text-gray-600 text-right">{timeline} days</div>
        </div>

        {/* Simulation Button */}
        <button
          onClick={handleSimulation}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Simulating...' : 'Simulate Impact'}
        </button>

        {/* Results */}
        {results && (
          <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800">Simulation Results</h3>
            
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600">EBITDA Impact</span>
                </div>
                <span className={`font-medium ${results.ebitdaImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.ebitdaImpact > 0 ? '+' : ''}{results.ebitdaImpact.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-gray-600">Risk Level Change</span>
                </div>
                <span className={`font-medium ${results.riskChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.riskChange > 0 ? '+' : ''}{results.riskChange.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Cost Savings</span>
                </div>
                <span className="font-medium text-green-600">
                  ${results.costSavings.toFixed(1)}M
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600">Schedule Impact</span>
                </div>
                <span className={`font-medium ${results.scheduleImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.scheduleImpact} days
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}