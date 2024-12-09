document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    startRealTimeUpdates();
});

function initializeDashboard() {
    // Initialize AI Insights first
    createIntelligentInsights();
    
    // Create charts in new order
    createVendorPerformanceChart();
    createSafetyIncidentsChart();
    createCostBreakdownChart();
    createResourceUtilizationChart();
    createEquipmentDowntimeChart();
    createTaskCompletionChart();

    // Enhance charts with AI features
    enhanceCharts();
}

function enhanceCharts() {
    const charts = [
        'vendorPerformanceChart',
        'safetyIncidentsChart',
        'costBreakdownChart',
        'resourceUtilizationChart',
        'equipmentDowntimeChart',
        'taskCompletionChart'
    ];
    
    charts.forEach(chartId => {
        addChartInteractivity(chartId);
        setupChartAnnotations(chartId);
    });
}


function addChartInteractivity(chartId) {
    // Example implementation of adding interactivity to a chart
    const chartElement = document.getElementById(chartId);
    if (chartElement) {
        chartElement.addEventListener('click', () => {
            console.log(`Chart ${chartId} clicked`);
            // Add more interactivity logic here
        });
    }
}


function setupEventListeners() {
    // Plant selector change
    document.getElementById('plantSelector').addEventListener('change', function(e) {
        updateAllCharts(e.target.value);
    });

    // Time range filter
    document.getElementById('timeRangeFilter').addEventListener('change', function(e) {
        updateTimeRange(e.target.value);
    });

    // Apply filters button
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
}

function startRealTimeUpdates() {
    // Update insights every 5 minutes
    setInterval(updateInsights, 300000);
    
    // Update charts every minute
    setInterval(updateChartData, 60000);
}

function createTaskCompletionChart() {
    var options = {
        series: [{
            name: 'Completed Tasks',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#taskCompletionChart"), options);
    chart.render();
}

function createResourceUtilizationChart() {
    var options = {
        series: [{
            name: 'Utilization',
            data: [80, 75, 60, 85, 65, 90, 70]
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
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
        xaxis: {
            categories: ["Labor", "Equipment", "Materials", "Contractors", "Tools", "Facilities", "Transport"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        title: {
            text: 'Resource Utilization',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#resourceUtilizationChart"), options);
    chart.render();
}

function createCostBreakdownChart() {
    var options = {
        series: [24.9, 31.1, 7.3, 24.3, 12.4],
        chart: {
            width: '100%',
            height: 350,
            type: 'pie',
        },
        labels: ['Labor', 'Materials', 'Equipment', 'Contractors', 'Other'],
        colors: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'],
        legend: {
            position: 'right',
            offsetY: 80,
            height: 230,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%"
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#costBreakdownChart"), options);
    chart.render();
}

function createSafetyIncidentsChart() {
    var options = {
        series: [{
            name: 'Incidents',
            data: [4, 5, 3, 2, 6, 4, 3]  // Reduced to more realistic numbers
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Slips', 'Falls', 'Cuts', 'Burns', 'Strains', 'Exposure', 'Other'],
        },
        yaxis: {
            title: {
                text: 'Number of Incidents'
            },
            max: 10  // Set reasonable max for y-axis
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " incidents"
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#safetyIncidentsChart"), options);
    chart.render();
}

function createEquipmentDowntimeChart() {
    var options = {
        series: [{
            data: [24, 36, 28, 42, 32, 38, 45]  // Hours of downtime
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val + ' hrs';  // Add hours label
            }
        },
        xaxis: {
            categories: ['Pumps', 'Valves', 'Compressors', 'Heat Exchangers', 'Tanks', 'Pipes', 'Instrumentation'],
            title: {
                text: 'Hours of Downtime'  // Clear axis label
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + ' hours';
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#equipmentDowntimeChart"), options);
    chart.render();
}

function createVendorPerformanceChart() {
    var options = {
        series: [{
            name: 'On-Time Delivery',
            data: [92, 88, 85, 90, 87, 89, 86]  // More realistic values
        }, {
            name: 'Quality Score',
            data: [90, 85, 82, 88, 84, 87, 85]  // More realistic values
        }],
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
            }
        },
        stroke: {
            width: 2
        },
        fill: {
            opacity: 0.1
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E', 'Vendor F', 'Vendor G']
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#vendorPerformanceChart"), options);
    chart.render();
}

// AI Insights

function createIntelligentInsights() {
    const insightsContainer = document.createElement('div');
    insightsContainer.className = 'ai-insights-panel';
    insightsContainer.innerHTML = `
        <div class="insights-header">
            <h3>AI-Driven Insights</h3>
            <span class="update-badge">Updated 5m ago</span>
        </div>
        <div class="insights-grid">
            <div class="insight-card bottleneck">
                <div class="insight-icon">🚨</div>
                <div class="insight-content">
                    <h4>Resource Bottleneck Alert</h4>
                    <p>Contractor utilization at 60% - significantly below target. Potential impact on task completion timeline.</p>
                    <div class="insight-action">
                        <button onclick="showBottleneckDetails()">View Resource Plan</button>
                    </div>
                </div>
            </div>
            <div class="insight-card safety">
                <div class="insight-icon">⚠️</div>
                <div class="insight-content">
                    <h4>Safety Pattern Detected</h4>
                    <p>20% increase in slip incidents during morning shifts. Correlation with recent weather conditions.</p>
                    <div class="insight-action">
                        <button onclick="showSafetyAnalysis()">Review Safety Measures</button>
                    </div>
                </div>
            </div>
            <div class="insight-card trend">
                <div class="insight-icon">📈</div>
                <div class="insight-content">
                    <h4>Correlation Identified</h4>
                    <p>Strong correlation between resource utilization and task completion rates in maintenance tasks.</p>
                    <div class="insight-action">
                        <button onclick="showTrendAnalysis()">View Analysis</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('.dashboard-container').insertBefore(insightsContainer, document.querySelector('.chart-container'));
}

// Update Resource Utilization chart to show bottleneck analysis
function enhanceResourceUtilizationChart() {
    const options = {
        series: [{
            name: 'Current Utilization',
            data: [80, 75, 60, 85, 65, 90, 70]
        }, {
            name: 'Optimal Range',
            data: [85, 80, 85, 85, 80, 85, 80]
        }],
        annotations: {
            yaxis: [{
                y: 75,
                borderColor: '#FFA500',
                label: {
                    text: 'Minimum Optimal Level',
                    style: {
                        color: '#FFA500'
                    }
                }
            }],
            points: [{
                x: 'Contractors',
                y: 60,
                marker: {
                    size: 8,
                    fillColor: '#FF4560',
                    strokeColor: '#fff',
                    radius: 2
                },
                label: {
                    borderColor: '#FF4560',
                    text: 'Critical Bottleneck',
                    style: {
                        color: '#fff',
                        background: '#FF4560'
                    }
                }
            }]
        },
        // ... rest of your existing options
    };
    
    // Update existing chart with new options
}

// Update Task Completion chart to show correlations
function enhanceTaskCompletionChart() {
    const options = {
        series: [{
            name: 'Task Completion',
            type: 'line',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Resource Utilization',
            type: 'area',
            data: [40, 55, 35, 60, 45, 90, 85]
        }],
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: ['solid', 'gradient'],
            opacity: [1, 0.3]
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: [{
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return y.toFixed(0) + " tasks";
                    }
                    return y;
                }
            }, {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return y.toFixed(0) + "%";
                    }
                    return y;
                }
            }]
        }
        // ... rest of your existing options
    };
    
    // Update existing chart with new options
}

// Add predictive safety analysis to Safety Incidents chart
function enhanceSafetyIncidentsChart() {
    const options = {
        series: [{
            name: 'Actual Incidents',
            data: [44, 55, 57, 56, 61, 58, 63]
        }, {
            name: 'Predicted Next Week',
            data: [42, 52, 55, 50, 58, 55, 60]
        }],
        markers: {
            size: 5,
            hover: {
                size: 7
            }
        },
        annotations: {
            points: [{
                x: 'Slips',
                y: 55,
                marker: {
                    size: 8,
                    fillColor: '#FFA500',
                    strokeColor: '#fff',
                    radius: 2
                },
                label: {
                    borderColor: '#FFA500',
                    text: '20% increase',
                    style: {
                        color: '#fff',
                        background: '#FFA500'
                    }
                }
            }]
        },
        // ... rest of your existing options
    };
    
    // Update existing chart with new options
}

function updateAllCharts(plantId) {
    // Fetch new data for selected plant
    fetchPlantData(plantId).then(data => {
        // Update each chart with new data
        updateTaskChart(data.tasks);
        updateResourceChart(data.resources);
        updateCostChart(data.costs);
        updateSafetyChart(data.safety);
        updateEquipmentChart(data.equipment);
        updateVendorChart(data.vendors);
        
        // Update AI insights for the selected plant
        updateIntelligentInsights(data.insights);
    });
}

function applyFilters() {
    const plant = document.getElementById('plantSelector').value;
    const timeRange = document.getElementById('timeRangeFilter').value;
    
    // Show loading state
    showLoadingState();
    
    // Fetch and update data with new filters
    fetchFilteredData(plant, timeRange).then(data => {
        updateAllCharts(data);
        hideLoadingState();
    });
}

function updateCharts() {
    // This function would update all charts based on the selected time range
    // For now, we'll just log the selected value
    var timeRange = document.getElementById('timeRangeFilter').value;
    console.log('Updating charts for time range:', timeRange);
    // In a real application, you would fetch new data and update each chart
}