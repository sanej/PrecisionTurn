document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    startRealTimeUpdates();
});

function initializeDashboard() {
    createAIInsights();
    createMultiPlantChart();
    createFinancialMetricsChart();
    createSchedulePerformanceChart();
    createRiskChart();
    createCrossPlantLearningChart();
    initializeScenarioPlanning();
}

// AI Insights Management
function createAIInsights() {
    const insights = [
        {
            type: 'pattern',
            message: 'Plant C showing 15% higher efficiency in maintenance spend',
            confidence: 92,
            impact: 'high'
        },
        {
            type: 'risk',
            message: 'Equipment failure probability increased by 23% in Plant E',
            confidence: 88,
            impact: 'critical'
        },
        {
            type: 'optimization',
            message: 'Potential $2.3M savings by applying Plant C practices to Plant B',
            confidence: 85,
            impact: 'medium'
        }
    ];

    const container = document.getElementById('aiInsights');
    container.innerHTML = insights.map(insight => `
        <div class="insight-card ${insight.type}">
            <div class="insight-header">
                <span class="insight-type">${insight.type.toUpperCase()}</span>
                <span class="confidence-badge">${insight.confidence}% confidence</span>
            </div>
            <div class="insight-content">
                <p>${insight.message}</p>
                <div class="impact-indicator ${insight.impact}">
                    Impact: ${insight.impact.toUpperCase()}
                </div>
            </div>
        </div>
    `).join('');
}

function createMultiPlantChart() {
    const options = {
        series: [{
            name: 'Progress',
            data: [75, 60, 90, 80, 85]
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '60%',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        yaxis: {
            title: {
                text: 'Completion Progress (%)',
                style: {
                    fontSize: '14px'
                }
            },
            labels: {
                formatter: function(val) {
                    return val + "%";
                }
            }
        },
        xaxis: {
            categories: ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E"],
            position: 'bottom'
        },
        colors: ['#2563eb']
    };

    const chart = new ApexCharts(document.querySelector("#multiPlantChart"), options);
    chart.render();
}


function createFinancialMetricsChart() {
    const options = {
        series: [{
            name: 'EBITDA Impact',
            data: [5.2, 4.8, 6.1, 5.5, 4.1]
        }, {
            name: 'NPV',
            data: [12.7, 11.5, 14.2, 13.1, 10.8]
        }, {
            name: 'IRR',
            data: [15.3, 14.8, 16.2, 15.7, 14.5]
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false  // Removed data labels, will show only on hover
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function(value, { seriesIndex }) {
                    if (seriesIndex === 2) return value.toFixed(1) + '%';
                    return '$' + value.toFixed(1) + 'M';
                }
            }
        },
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E']
        },
        colors: ['#2563eb', '#10b981', '#f59e0b']
    };

    const chart = new ApexCharts(document.querySelector("#financialMetricsChart"), options);
    chart.render();
}

function createSchedulePerformanceChart() {
    const options = {
        series: [{
            name: 'Ahead/Behind Schedule (Days)',
            data: [2, -1, 3, 0, -2]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: -100,
                        to: 0,
                        color: '#F15B46'
                    }, {
                        from: 0,
                        to: 100,
                        color: '#59C3C3'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            title: {
                text: 'Days'
            }
        },
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E']
        }
    };

    const chart = new ApexCharts(document.querySelector("#schedulePerformanceChart"), options);
    chart.render();
}

function createRiskChart() {
    const options = {
        series: [24.9, 31.1, 7.3, 24.3, 12.4],
        chart: {
            type: 'pie',
            height: 350,
            title: {
                text: 'Risk Distribution Analysis',  // More descriptive title
                align: 'left'
            }
        },
        labels: ['Safety', 'Schedule', 'Cost', 'Quality', 'Environmental'],
        colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        legend: {
            position: 'right',
            offsetY: 50,
            height: 230,
            formatter: function(seriesName) {
                return seriesName;  // Simplified legend without values
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%";
            }
        },
        tooltip: {
            y: {
                formatter: function(value) {
                    return value.toFixed(1) + '% of total risk exposure';
                }
            }
        }
    };

    const chart = new ApexCharts(document.querySelector("#riskChart"), options);
    chart.render();
}

function createCrossPlantLearningChart() {
    const options = {
        series: [{
            name: 'Best Practices Adoption',
            data: [65, 45, 85, 70, 60]
        }, {
            name: 'Efficiency Improvement',
            data: [35, 25, 40, 30, 35]
        }],
        chart: {
            type: 'radar',
            height: 350
        },
        
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E']
        }
    };

    const chart = new ApexCharts(document.querySelector("#crossPlantLearningChart"), options);
    chart.render();
}

// Scenario Planning
function initializeScenarioPlanning() {

    const container = document.querySelector('.scenario-planning-container');
    const plantSelector = document.createElement('div');
    plantSelector.className = 'plant-selector';
    plantSelector.innerHTML = `
        <label for="plantSelect">Select Plant:</label>
        <select id="plantSelect" class="plant-select">
            <option value="A">Plant A</option>
            <option value="B">Plant B</option>
            <option value="C">Plant C</option>
            <option value="D">Plant D</option>
            <option value="E">Plant E</option>
        </select>
    `;
    container.insertBefore(plantSelector, container.firstChild);

    const budgetSlider = document.getElementById('budgetSlider');
    const timelineSlider = document.getElementById('timelineSlider');
    const simulateButton = document.getElementById('simulateScenario');


    updateSliderValue(budgetSlider);
    updateSliderValue(timelineSlider);

    simulateButton.addEventListener('click', runScenarioSimulation);
}

function updateSliderValue(slider) {
    const valueDisplay = slider.nextElementSibling;
    slider.addEventListener('input', () => {
        const value = slider.value;
        valueDisplay.textContent = slider.id === 'budgetSlider' ? 
            `${value}%` : `${value} days`;
    });
}

function runScenarioSimulation() {
    const budgetAdjustment = parseInt(document.getElementById('budgetSlider').value);
    const timelineShift = parseInt(document.getElementById('timelineSlider').value);
    
    // Show loading state
    const resultsContainer = document.getElementById('scenarioResults');
    resultsContainer.innerHTML = '<div class="loading">Simulating scenario...</div>';
    
    // Simulate API call delay
    setTimeout(() => {
        const results = calculateScenarioImpact(budgetAdjustment, timelineShift);
        displayScenarioResults(results);
    }, 1500);
}

function calculateScenarioImpact(budgetAdjustment, timelineShift) {
    // Simplified impact calculations
    return {
        ebitdaImpact: budgetAdjustment * 1.2,
        riskChange: timelineShift * 0.5,
        costSavings: budgetAdjustment < 0 ? Math.abs(budgetAdjustment * 0.8) : 0,
        scheduleImpact: timelineShift
    };
}

function displayScenarioResults(results) {
    const container = document.getElementById('scenarioResults');
    container.innerHTML = `
        <div class="scenario-result-item">
            <span>EBITDA Impact:</span>
            <span class="${results.ebitdaImpact >= 0 ? 'positive' : 'negative'}">
                ${results.ebitdaImpact > 0 ? '+' : ''}${results.ebitdaImpact.toFixed(1)}%
            </span>
        </div>
        <div class="scenario-result-item">
            <span>Risk Level Change:</span>
            <span class="${results.riskChange <= 0 ? 'positive' : 'negative'}">
                ${results.riskChange > 0 ? '+' : ''}${results.riskChange.toFixed(1)}%
            </span>
        </div>
        <div class="scenario-result-item">
            <span>Potential Cost Savings:</span>
            <span class="positive">$${results.costSavings.toFixed(1)}M</span>
        </div>
        <div class="scenario-result-item">
            <span>Schedule Impact:</span>
            <span class="${results.scheduleImpact >= 0 ? 'positive' : 'negative'}">
                ${results.scheduleImpact} days
            </span>
        </div>
    `;
}

// Real-time Updates
function startRealTimeUpdates() {
    setInterval(updateDashboardData, 30000); // Update every 30 seconds
}

function updateDashboardData() {
    // Simulate real-time data updates
    updateChartData();
    updateAIInsights();
    updateKPIs();
}

function updateChartData() {
    // Add random variations to chart data
    const charts = document.querySelectorAll('.apexcharts-canvas');
    charts.forEach(chart => {
        const chartInstance = ApexCharts.getChartByID(chart.id);
        if (chartInstance) {
            const currentData = chartInstance.w.globals.series[0].data;
            const newData = currentData.map(value => 
                Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 5))
            );
            chartInstance.updateSeries([{ data: newData }]);
        }
    });
}

function updateKPIs() {
    // Update KPI values with small random variations
    const kpiElements = document.querySelectorAll('.kpi-value');
    kpiElements.forEach(element => {
        const currentValue = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ""));
        const newValue = currentValue * (1 + (Math.random() - 0.5) * 0.02);
        element.textContent = element.textContent.replace(
            currentValue.toString(), 
            newValue.toFixed(1)
        );
    });
}

function updateAIInsights() {
    // Periodically generate new AI insights
    const newInsight = generateNewInsight();
    if (newInsight) {
        const container = document.getElementById('aiInsights');
        const insightElement = createInsightElement(newInsight);
        container.insertBefore(insightElement, container.firstChild);
        if (container.children.length > 5) {
            container.removeChild(container.lastChild);
        }
    }
}

function generateNewInsight() {
    // Simulate new insight generation
    const random = Math.random();
    if (random < 0.3) {
        return {
            type: 'pattern',
            message: `New efficiency pattern detected in Plant ${['A','B','C','D','E'][Math.floor(Math.random()*5)]}`,
            confidence: Math.floor(80 + Math.random() * 15),
            impact: ['low', 'medium', 'high'][Math.floor(Math.random()*3)]
        };
    }
    return null;
}

// Event Listeners
function setupEventListeners() {
    // Add event listeners for user interactions
    document.querySelectorAll('.chart-item').forEach(item => {
        item.addEventListener('click', () => expandChart(item));
    });

    document.querySelectorAll('.insight-card').forEach(card => {
        card.addEventListener('click', () => showInsightDetails(card));
    });
}

function expandChart(chartItem) {
    // Implement chart expansion logic
    const isExpanded = chartItem.classList.contains('expanded');
    document.querySelectorAll('.chart-item').forEach(item => {
        item.classList.remove('expanded');
    });
    if (!isExpanded) {
        chartItem.classList.add('expanded');
    }
}

function showInsightDetails(insightCard) {
    // Implement insight details modal
    const modal = document.createElement('div');
    modal.className = 'insight-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${insightCard.querySelector('.insight-type').textContent}</h3>
            <p>${insightCard.querySelector('.insight-content p').textContent}</p>
            <div class="modal-actions">
                <button onclick="this.closest('.insight-modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}