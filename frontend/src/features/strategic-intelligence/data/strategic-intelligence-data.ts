// /features/strategic-intelligence/data/strategic-intelligence-data.ts

export const aiInsightsData = {
    insights: [
      {
        id: 1,
        type: 'pattern',
        message: 'Plant C showing 15% higher efficiency in maintenance spend',
        confidence: 92,
        impact: 'high',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'risk',
        message: 'Equipment failure probability increased by 23% in Plant E',
        confidence: 88,
        impact: 'critical',
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        type: 'optimization',
        message: 'Potential $2.3M savings by applying Plant C practices to Plant B',
        confidence: 85,
        impact: 'medium',
        timestamp: new Date().toISOString()
      }
    ]
  };
  
  export const plantPerformanceData = {
    series: [{
      name: 'Progress',
      data: [75, 60, 90, 80, 85]
    }],
    categories: ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E"]
  };
  
  export const financialMetricsData = {
    series: [
      {
        name: 'EBITDA Impact',
        data: [5.2, 4.8, 6.1, 5.5, 4.1]
      },
      {
        name: 'NPV',
        data: [12.7, 11.5, 14.2, 13.1, 10.8]
      },
      {
        name: 'IRR',
        data: [15.3, 14.8, 16.2, 15.7, 14.5]
      }
    ],
    categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E']
  };
  
  export const kpiData = [
    {
      id: 1,
      title: 'Total EBITDA Impact',
      value: '+$25.7M',
      trend: { value: 2.3, direction: 'up' }
    },
    {
      id: 2,
      title: 'Average NPV',
      value: '$18.3M',
      trend: { value: 1.8, direction: 'up' }
    },
    {
      id: 3,
      title: 'Average IRR',
      value: '16.5%',
      trend: { value: 0.5, direction: 'up' }
    },
    {
      id: 4,
      title: 'Total % of Revenue',
      value: '4.2%',
      trend: { value: 0.0, direction: 'neutral' }
    }
  ];
  
  export const riskDistributionData = {
    series: [24.9, 31.1, 7.3, 24.3, 12.4],
    labels: ['Safety', 'Schedule', 'Cost', 'Quality', 'Environmental'],
    colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  };
  
  export const crossPlantLearningData = {
    series: [
      {
        name: 'Best Practices Adoption',
        data: [65, 45, 85, 70, 60]
      },
      {
        name: 'Efficiency Improvement',
        data: [35, 25, 40, 30, 35]
      }
    ],
    categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E']
  };
  
  export const scenarioPlanningData = {
    plants: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E'],
    controls: {
      budget: {
        min: -20,
        max: 20,
        default: 0,
        step: 1
      },
      timeline: {
        min: -30,
        max: 30,
        default: 0,
        step: 1
      }
    }
  };