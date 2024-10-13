document.addEventListener("DOMContentLoaded", () => {
    createPerformanceIndexChart();
    createCostOverviewChart();
    createScheduleProgressChart();
    createSafetyPerformanceChart();
});

function createPerformanceIndexChart() {
    const options = {
        series: [{
            name: 'Performance',
            data: [85, 92, 88, 95, 90],
        }],
        chart: {
            height: 350,
            type: 'radar',
        },
        xaxis: {
            categories: ['Overall', 'Cost', 'Schedule', 'Safety', 'Quality']
        },
        yaxis: {
            show: false,
        },
        markers: {
            size: 4,
            colors: ['#2196F3'],
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        fill: {
            opacity: 0.7
        }
    };

    const chart = new ApexCharts(document.querySelector("#performanceIndexChart"), options);
    chart.render();
}

function createCostOverviewChart() {
    const options = {
        series: [{
            name: 'Actual Cost',
            data: [30, 60, 100, 140]
        }, {
            name: 'Budget',
            data: [35, 70, 105, 150]
        }],
        chart: {
            type: 'area',
            height: 350,
            stacked: false,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        },
        yaxis: {
            title: {
                text: 'Cost (Millions $)'
            },
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    const chart = new ApexCharts(document.querySelector("#costOverviewChart"), options);
    chart.render();
}

function createScheduleProgressChart() {
    const options = {
        series: [{
            data: [{
                x: 'Planning',
                y: [0, 7]
            }, {
                x: 'Shutdown',
                y: [7, 14]
            }, {
                x: 'Maintenance',
                y: [14, 35]
            }, {
                x: 'Startup',
                y: [35, 38]
            }]
        }],
        chart: {
            height: 350,
            type: 'rangeBar'
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        xaxis: {
            type: 'datetime'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
            }
        }
    };

    const chart = new ApexCharts(document.querySelector("#scheduleProgressChart"), options);
    chart.render();
}

function createSafetyPerformanceChart() {
    const options = {
        series: [{
            name: 'TRIR',
            data: [0.50, 0.45, 0.40, 0.35]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Total Recordable Incident Rate Trend',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        }
    };

    const chart = new ApexCharts(document.querySelector("#safetyPerformanceChart"), options);
    chart.render();
}