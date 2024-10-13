document.addEventListener("DOMContentLoaded", () => {
    // Existing charts
    createHeatmapChart("turnaroundPerformanceChart");
    createLineChart("costPerformanceChart", "Cost Performance");
    createLineChart("schedulePerformanceChart", "Schedule Performance");
    createLineChart("safetyMetricsChart", "Safety Incidents");

    // New charts
    createBarChart("scopeDefinitionChart", "Scope Definition");
    createBarChart("resourceAllocationChart", "Resource Allocation");
    createBarChart("activeTasksChart", "Active Tasks");
    createLineChart("energyConsumptionChart", "Energy Consumption");
    createBarChart("topVendorChart", "Top Vendors");
    createBarChart("tasksProgressChart", "Tasks Progress");
    createBarChart("materialSpendChart", "Material Spend");
    createLineChart("materialUsageChart", "Material Usage");
    createBarChart("globalAlertsChart", "Global Alerts");
    createBarChart("regulatoryAlertsChart", "Regulatory Alerts");
    createLineChart("energyPriceChart", "Energy Price");
    createBarChart("weatherAlertChart", "Weather Alert");
});

function createHeatmapChart(elementId) {
    var options = {
        chart: {
            type: 'heatmap',
            height: 350,
        },
        series: [
            {
                name: 'Phase 1',
                data: [7, 7, 7, 7]
            },
            {
                name: 'Phase 2',
                data: [7, 7, 7, 7]
            }
        ],
        xaxis: {
            categories: ["Metric 1", "Metric 2", "Metric 3", "Metric 4"]
        }
    };

    var chart = new ApexCharts(document.querySelector("#" + elementId), options);
    chart.render();
}

function createLineChart(elementId, seriesName) {
    var options = {
        chart: {
            type: 'line',
            height: 350
        },
        series: [
            {
                name: seriesName,
                data: [50, 60, 70, 80, 90, 100]
            }
        ],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        }
    };

    var chart = new ApexCharts(document.querySelector("#" + elementId), options);
    chart.render();
}

function createBarChart(elementId, seriesName) {
    var options = {
        chart: {
            type: 'bar',
            height: 350
        },
        series: [
            {
                name: seriesName,
                data: [30, 40, 45, 50, 49, 60]
            }
        ],
        xaxis: {
            categories: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"]
        }
    };

    var chart = new ApexCharts(document.querySelector("#" + elementId), options);
    chart.render();
}