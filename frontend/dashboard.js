document.addEventListener('DOMContentLoaded', function() {
    createPerformanceIndexChart();
    createCostOverviewChart();
    createScheduleProgressChart();
    createSafetyPerformanceChart();
});

const commonOptions = {
    chart: {
        fontFamily: 'Arial, sans-serif',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false }
    }
};

function createPerformanceIndexChart() {
    const options = {
        ...commonOptions,
        series: [{
            name: 'Performance',
            data: [85, 92, 88, 95, 90]
        }],
        chart: {
            type: 'radar',
            height: 300
        },
        xaxis: {
            categories: ['Overall', 'Cost', 'Schedule', 'Safety', 'Quality']
        },
        yaxis: {
            show: false
        },
        markers: {
            size: 4
        },
        fill: {
            opacity: 0.7
        }
    };

    new ApexCharts(document.querySelector("#performanceIndexChart"), options).render();
}

function createCostOverviewChart() {
    const options = {
        ...commonOptions,
        series: [
            { name: 'Actual Cost', data: [30, 60, 100, 140] },
            { name: 'Budget', data: [35, 70, 105, 150] }
        ],
        chart: {
            type: 'area',
            height: 300
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yaxis: {
            title: { text: 'Cost (Millions $)' },
            labels: {
                formatter: (value) => `${value}M`
            }
        },
        tooltip: {
            y: {
                formatter: (value) => `$${value} Million`
            }
        }
    };

    new ApexCharts(document.querySelector("#costOverviewChart"), options).render();
}

function createScheduleProgressChart() {
    const options = {
        ...commonOptions,
        series: [{
            data: [7, 7, 21, 3]
        }],
        chart: {
            type: 'bar',
            height: 300
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} days`,
            offsetX: 30
        },
        xaxis: {
            categories: ['Planning', 'Shutdown', 'Maintenance', 'Startup'],
            labels: {
                formatter: (value) => `${value} days`
            }
        }
    };

    new ApexCharts(document.querySelector("#scheduleProgressChart"), options).render();
}

function createSafetyPerformanceChart() {
    const options = {
        ...commonOptions,
        series: [{
            name: 'TRIR',
            data: [0.50, 0.45, 0.40, 0.35]
        }],
        chart: {
            type: 'line',
            height: 300
        },
        title: {
            text: 'Total Recordable Incident Rate Trend',
            align: 'left'
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yaxis: {
            title: { text: 'TRIR' },
            min: 0.30,
            max: 0.55,
            tickAmount: 5,
            labels: {
                formatter: (value) => value.toFixed(2)
            }
        }
    };

    new ApexCharts(document.querySelector("#safetyPerformanceChart"), options).render();
}