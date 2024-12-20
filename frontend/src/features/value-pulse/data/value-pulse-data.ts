// /features/value-pulse//data/value-pulse-data.ts

export const valueTrackerData = {
    cards: [
      {
        id: 'real-time-value',
        title: 'Real-Time Value Creation',
        amount: 2100000, // $2.1M
        source: 'Early valve failure detection',
        impact: '+$450K vs traditional detection',
        type: 'predictive' as const,
        trend: {
          value: 12.5,
          direction: 'up'
        }
      },
      {
        id: 'cost-avoidance',
        title: 'Cost Avoidance',
        amount: 3200000, // $3.2M
        source: 'ML-optimized critical path',
        impact: '4.5 days of production saved',
        type: 'optimization' as const,
        trend: {
          value: 8.3,
          direction: 'up'
        }
      },
      {
        id: 'risk-protected',
        title: 'Risk Value Protected',
        amount: 1800000, // $1.8M
        source: 'Automated risk detection',
        impact: '3 high-risk activities mitigated',
        type: 'risk' as const,
        trend: {
          value: 15.2,
          direction: 'down'
        }
      },
      {
        id: 'efficiency-gains',
        title: 'Efficiency Gains',
        amount: 800000, // $800K
        source: 'Resource reallocation',
        impact: '40% improvement in utilization',
        type: 'efficiency' as const,
        trend: {
          value: 5.7,
          direction: 'up'
        }
      }
    ]
  };
  
  export const timelineData = {
    events: [
      {
        id: 1,
        time: '2 min ago',
        action: 'Early valve failure detection',
        value: 450000, // $450K
        valueText: 'Saved $450K in potential damage',
        type: 'savings' as const,
        severity: 'high',
        location: 'Unit 3 Processing'
      },
      {
        id: 2,
        time: '15 min ago',
        action: 'Resource reallocation completed',
        value: 85000, // $85K
        valueText: 'Optimization value: $85K',
        type: 'optimization' as const,
        severity: 'medium',
        location: 'Maintenance Team'
      },
      {
        id: 3,
        time: '1 hour ago',
        action: 'High-risk activity identified',
        value: 120000, // $120K
        valueText: 'Potential impact: $120K',
        type: 'risk' as const,
        severity: 'high',
        location: 'Safety Operations'
      }
    ],
    filters: {
      types: ['savings', 'optimization', 'risk'],
      severities: ['high', 'medium', 'low'],
      timeRanges: ['1h', '24h', '7d', '30d']
    }
  };
  
  export const financialData = {
    summary: {
      totalValue: {
        current: 7900000, // $7.9M
        previous: 7050000, // $7.05M
        periodLabel: 'Last 30 Days',
        trend: {
          value: 12,
          direction: 'up'
        }
      },
      valueAtRisk: {
        current: 655000, // $655K
        threshold: 500000, // $500K
        periodLabel: 'Next 7 Days',
        criticalActions: 3,
        riskAreas: ['Schedule Delay', 'Resource Shortage', 'Quality Issues']
      }
    },
    historicalTrends: {
      dates: Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString();
      }),
      values: Array.from({ length: 30 }, () => 
        Math.floor(Math.random() * (8500000 - 7000000) + 7000000)
      )
    }
  };
  
  export const valueMetrics = {
    realTimeUpdates: true,
    updateInterval: 60000, // 60 seconds
    thresholds: {
      risk: {
        high: 1000000, // $1M
        medium: 500000, // $500K
        low: 100000 // $100K
      },
      efficiency: {
        target: 85,
        warning: 70,
        critical: 60
      }
    },
    formatting: {
      currency: {
        locale: 'en-US',
        style: 'currency',
        currency: 'USD',
        notation: 'compact'
      }
    }
  };