document.addEventListener('DOMContentLoaded', function() {
    initializeValuePulse();
});

function initializeValuePulse() {
    renderInsightCards();
    renderRecommendations();
}

const insightCardsData = [
    {
        icon: 'chart-line',
        title: 'Predictive Cost Alert',
        description: 'AI detected potential valve failure in Unit 3',
        value: '$2.1M',
        detail: 'Early intervention vs emergency repair',
        class: 'blue'
    },
    {
        icon: 'clock',
        title: 'Schedule Impact',
        description: 'ML-optimized critical path',
        value: '4.5 Days Saved',
        detail: '$3.2M production value recovered',
        class: 'green'
    },
    {
        icon: 'exclamation-triangle',
        title: 'Risk Prevention',
        description: 'ML identified 3 high-risk activities',
        value: '$1.8M Risk Mitigated',
        detail: 'Based on historical incident costs',
        class: 'yellow'
    },
    {
        icon: 'shield-alt',
        title: 'Safety Enhancement',
        description: 'Automated compliance monitoring',
        value: '40% Incident Reduction',
        detail: '$800K savings in safety-related costs',
        class: 'purple'
    }
];

const recommendationsData = [
    {
        priority: 'high',
        title: 'Critical Path Impact Alert',
        description: 'Predicted delay in heat exchanger maintenance could impact restart timeline',
        impact: '$450K per day',
        confidence: '92%',
        action: 'View Resolution Plan'
    },
    {
        priority: 'approved',
        title: 'Resource Optimization',
        description: 'ML suggests reallocating 3 specialized welders from Unit 2 to Unit 4',
        impact: '$85K',
        confidence: '89%',
        action: 'Implement Change'
    },
    {
        priority: 'low',
        title: 'Preventive Action Required',
        description: 'Valve degradation detected in cooling system - Schedule replacement within 48hrs',
        impact: '$120K',
        confidence: '94%',
        action: 'Schedule Maintenance'
    }
];

function renderInsightCards() {
    const container = document.querySelector('.insights-grid');
    if (!container) return;

    container.innerHTML = insightCardsData.map(card => `
        <div class="insight-card ${card.class}">
            <div class="card-icon">
                <i class="fas fa-${card.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <div class="metric">
                    <div class="metric-value">${card.value}</div>
                    <div class="metric-label">${card.detail}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRecommendations() {
    const container = document.querySelector('.recommendations-list');
    if (!container) return;

    container.innerHTML = recommendationsData.map(rec => `
        <div class="recommendation ${rec.priority}">
            <div class="rec-marker"></div>
            <div class="rec-content">
                <div class="rec-header">
                    <h3>${rec.title}</h3>
                    <span class="priority-badge ${rec.priority}">${rec.priority}</span>
                </div>
                <p>${rec.description}</p>
                <div class="rec-footer">
                    <div class="impact">Impact: ${rec.impact}</div>
                    <button class="action-btn" onclick="handleAction('${rec.action}')">${rec.action}</button>
                    <span class="confidence">AI Confidence: ${rec.confidence}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function handleAction(action) {
    // Placeholder for action handling
    console.log(`Action clicked: ${action}`);
}