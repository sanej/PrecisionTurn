// Initialize Value Pulse Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeValuePulse();
    startRealTimeUpdates();
});

function initializeValuePulse() {
    renderValueTimeline();
    initializeValueUpdates();
}

function renderValueTimeline() {
    const timelineData = [
        {
            time: '2 min ago',
            action: 'Early valve failure detection',
            value: 'Saved $450K in potential damage',
            type: 'savings'
        },
        {
            time: '15 min ago',
            action: 'Resource reallocation completed',
            value: 'Optimization value: $85K',
            type: 'optimization'
        },
        {
            time: '1 hour ago',
            action: 'High-risk activity identified',
            value: 'Potential impact: $120K',
            type: 'risk'
        }
    ];

    const timelineContainer = document.getElementById('valueTimeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = timelineData.map(item => `
        <div class="timeline-item">
            <div class="timeline-time">${item.time}</div>
            <div class="timeline-marker ${item.type}"></div>
            <div class="timeline-content">
                <div class="timeline-action">${item.action}</div>
                <div class="timeline-value ${item.type}">${item.value}</div>
            </div>
        </div>
    `).join('');
}

function initializeValueUpdates() {
    // Initialize real-time counters and updates
    updateValueCounters();
    setInterval(updateValueCounters, 60000); // Update every minute
}

function updateValueCounters() {
    // Simulate real-time value updates
    const updates = {
        'real-time-value': formatCurrency(Math.random() * 1000000),
        'cost-avoidance': formatCurrency(Math.random() * 2000000),
        'risk-protected': formatCurrency(Math.random() * 500000),
        'efficiency-gains': formatCurrency(Math.random() * 300000)
    };

    // Update the DOM with new values
    Object.entries(updates).forEach(([id, value]) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
            element.textContent = value;
            animateValueUpdate(element);
        }
    });
}

function formatCurrency(value) {
    return `$${(value / 1000000).toFixed(1)}M`;
}

function animateValueUpdate(element) {
    element.classList.add('value-updated');
    setTimeout(() => element.classList.remove('value-updated'), 2000);
}

function startRealTimeUpdates() {
    // Update last updated timestamp
    setInterval(() => {
        const lastUpdated = document.querySelector('.last-updated');
        if (lastUpdated) {
            const minutes = Math.floor(Math.random() * 5) + 1;
            lastUpdated.textContent = `Last updated: ${minutes}m ago`;
        }
    }, 30000); // Update every 30 seconds
}

// Handle value card interactions
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('click', function() {
        // Handle card click - could show detailed breakdown
        console.log('Value card clicked:', this.querySelector('h3').textContent);
    });
});