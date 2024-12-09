new Vue({
    el: '#app',
    data: {
        agents: [
            // Pre-Turnaround
            { id: 1, name: 'Planner Agent', description: 'Optimizes task scheduling and resource allocation.', active: false, category: 'Pre-Turnaround', tasksCompleted: 25, efficiencyGain: 10, icon: 'schedule' },
            { id: 2, name: 'Risk Assessment Agent', description: 'Analyzes and predicts potential risks in turnaround operations.', active: false, category: 'Pre-Turnaround', tasksCompleted: 20, icon: 'report' },
            { id: 3, name: 'Scenario Simulator', description: 'Runs multiple "what-if" scenarios to identify optimal turnaround strategies.', active: false, category: 'Pre-Turnaround', icon: 'simulation' },
            { id: 4, name: 'Vendor Management Assistant', description: 'Helps select and manage vendors based on performance.', active: false, category: 'Pre-Turnaround', icon: 'business' },

            // Turnaround
            { id: 5, name: 'Resource Optimizer Agent', description: 'Optimizes personnel and asset utilization.', active: false, category: 'Turnaround', efficiencyGain: 15, icon: 'people' },
            { id: 6, name: 'Adaptive Scheduling Agent', description: 'Adjusts schedules dynamically based on real-time changes.', active: false, category: 'Turnaround', tasksCompleted: 30, icon: 'event' },
            { id: 7, name: 'Safety Compliance Monitor', description: 'Ensures activities comply with safety regulations.', active: false, category: 'Turnaround', icon: 'security' },
            { id: 8, name: 'Crisis Management Coordinator', description: 'Assists in responding to unexpected issues.', active: false, category: 'Turnaround', icon: 'warning' },

            // Cross-Phase
            { id: 9, name: 'Predictive Maintenance Assistant', description: 'Predicts potential issues and suggests maintenance tasks.', active: false, category: 'Cross-Phase', icon: 'build' },
            { id: 10, name: 'Stakeholder Communication Agent', description: 'Manages communication between stakeholders.', active: false, category: 'Cross-Phase', icon: 'groups' },
            { id: 11, name: 'Cost Control Agent', description: 'Monitors expenses and forecasts overruns.', active: false, category: 'Cross-Phase', icon: 'attach_money' },

            // Post-Turnaround
            { id: 12, name: 'Knowledge Transfer Facilitator', description: 'Captures lessons learned for future turnarounds.', active: false, category: 'Post-Turnaround', icon: 'school' },
            { id: 13, name: 'Post-Turnaround Analysis Agent', description: 'Conducts comprehensive analysis of turnaround performance.', active: false, category: 'Post-Turnaround', icon: 'analytics' },
        ]
    },
    computed: {
        groupedAgents() {
            return [
                { name: 'Pre-Turnaround', agents: this.agents.filter(agent => agent.category === 'Pre-Turnaround') },
                { name: 'Turnaround', agents: this.agents.filter(agent => agent.category === 'Turnaround') },
                { name: 'Cross-Phase', agents: this.agents.filter(agent => agent.category === 'Cross-Phase') },
                { name: 'Post-Turnaround', agents: this.agents.filter(agent => agent.category === 'Post-Turnaround') },
            ];
        },
        activeAgents() {
            return this.agents.filter(agent => agent.active);
        }
    },
    methods: {
        toggleAgent(agent) {
            agent.active = !agent.active;
            console.log(`${agent.name} is now ${agent.active ? 'active' : 'inactive'}`);
        }
    }
});
