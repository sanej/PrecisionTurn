new Vue({
    el: '#app',
    data: {
        agents: [
            { id: 1, name: 'Planner Agent', description: 'Optimizes task scheduling and resource allocation', active: false, category: 'Pre-Turnaround' },
            { id: 2, name: 'Risk Assessment Agent', description: 'Analyzes and predicts potential risks in turnaround operations', active: false, category: 'Pre-Turnaround' },
            { id: 3, name: 'Resource Optimizer Agent', description: 'Manages and optimizes personnel and asset utilization', active: false, category: 'Turnaround' },
            { id: 4, name: 'Dynamic Document Analyzer', description: 'Continuously scans and analyzes new documents, updating the knowledge base', active: false, category: 'Turnaround' },
            { id: 5, name: 'Predictive Maintenance Assistant', description: 'Analyzes data to predict potential issues and suggest proactive maintenance tasks', active: false, category: 'Cross-Phase' },
            { id: 6, name: 'Safety Compliance Monitor', description: 'Ensures all planned activities comply with latest safety regulations', active: false, category: 'Turnaround' },
            { id: 7, name: 'Scenario Simulator', description: 'Runs multiple "what-if" scenarios to identify optimal turnaround strategies', active: false, category: 'Pre-Turnaround' },
            { id: 8, name: 'Stakeholder Communication Agent', description: 'Manages and streamlines communication between different stakeholder groups', active: false, category: 'Cross-Phase' },
            { id: 9, name: 'Cost Control Agent', description: 'Monitors expenses in real-time and forecasts potential overruns', active: false, category: 'Cross-Phase' },
            { id: 10, name: 'Knowledge Transfer Facilitator', description: 'Captures insights and lessons learned from each turnaround', active: false, category: 'Post-Turnaround' },
            { id: 11, name: 'Adaptive Scheduling Agent', description: 'Continuously adjusts the turnaround schedule based on progress and unforeseen events', active: false, category: 'Turnaround' },
            { id: 12, name: 'Vendor Management Assistant', description: 'Helps in selecting and managing vendors based on past performance and current requirements', active: false, category: 'Pre-Turnaround' },
            { id: 13, name: 'Training and Onboarding Agent', description: 'Provides personalized training content for new team members', active: false, category: 'Pre-Turnaround' },
            { id: 14, name: 'Environmental Impact Analyzer', description: 'Assesses the environmental impact of turnaround activities', active: false, category: 'Pre-Turnaround' },
            { id: 15, name: 'Crisis Management Coordinator', description: 'Assists in rapidly responding to unexpected issues during a turnaround', active: false, category: 'Turnaround' },
            { id: 16, name: 'Post-Turnaround Analysis Agent', description: 'Conducts comprehensive analysis after each turnaround', active: false, category: 'Post-Turnaround' }
        ]
    },
    computed: {
        groupedAgents() {
            return this.agents.reduce((acc, agent) => {
                if (!acc[agent.category]) {
                    acc[agent.category] = [];
                }
                acc[agent.category].push(agent);
                return acc;
            }, {});
        }
    },
    methods: {
        toggleAgent(agent) {
            agent.active = !agent.active;
            // Here you would typically make an API call to activate/deactivate the agent on the backend
            console.log(`${agent.name} is now ${agent.active ? 'active' : 'inactive'}`);
        }
    }
});