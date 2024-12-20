// ../../lib/data/ops-intelligence-data.ts

export const vendorData = {
    series: [{
      name: 'On-Time Delivery',
      data: [88, 82, 71, 85, 79, 83, 76]  // More variation, some vendors struggling
    }, {
      name: 'Quality Score',
      data: [75, 78, 69, 82, 75, 80, 73]  // Quality usually slightly lower than delivery
    }],
    categories: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E', 'Vendor F', 'Vendor G']
  };
  
  export const safetyData = {
    series: [{
      name: 'Incidents',
      data: [4, 5, 3, 2, 6, 4, 3]
    }],
    categories: ['Slips', 'Falls', 'Cuts', 'Burns', 'Strains', 'Exposure', 'Other']
  };
  
  export const costData = {
    series: [24.9, 31.1, 7.3, 24.3, 12.4],
    labels: ['Labor', 'Materials', 'Equipment', 'Contractors', 'Other']
  };
  
  export const resourceData = {
    series: [{
      name: 'Utilization',
      data: [80, 75, 60, 85, 65, 90, 70]
    }],
    categories: ["Labor", "Equipment", "Materials", "Contractors", "Tools", "Facilities", "Transport"]
  };
  
  export const equipmentData = {
    series: [{
      data: [24, 36, 28, 42, 32, 38, 45]
    }],
    categories: ['Pumps', 'Valves', 'Compressors', 'Heat Exchangers', 'Tanks', 'Pipes', 'Instrumentation']
  };
  
  export const taskData = {
    series: [{
      name: 'Completed Tasks',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    categories: Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString();
    })
  };
  
  export const aiInsightsData = {
    lastUpdate: '5m ago',
    insights: [
      {
        type: 'bottleneck',
        icon: '🚨',
        title: 'Resource Bottleneck Alert',
        description: 'Contractor utilization at 60% - significantly below target. Potential impact on task completion timeline.',
        action: 'View Resource Plan'
      },
      {
        type: 'safety',
        icon: '⚠️',
        title: 'Safety Pattern Detected',
        description: '20% increase in slip incidents during morning shifts. Correlation with recent weather conditions.',
        action: 'Review Safety Measures'
      },
      {
        type: 'trend',
        icon: '📈',
        title: 'Correlation Identified',
        description: 'Strong correlation between resource utilization and task completion rates in maintenance tasks.',
        action: 'View Analysis'
      }
    ]
  };