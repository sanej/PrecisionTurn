document.addEventListener('DOMContentLoaded', function() {
    createPerformanceIndexChart();
    createCostOverviewChart();
    createScheduleProgressChart();
    createSafetyPerformanceChart();
});

// Common options for all charts
const commonOptions = {
    chart: {
        fontFamily: 'Inter, sans-serif',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    colors: ['#2196f3', '#4caf50', '#ff9800'],
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        offsetY: 10,
        markers: {
            width: 8,
            height: 8,
            radius: 4
        },
        itemMargin: {
            horizontal: 15
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        }
    },
    grid: {
        borderColor: '#f1f1f1',
        padding: {
            top: 20
        }
    }
};

function createPerformanceIndexChart() {
    const options = {
        ...commonOptions,
        series: [{
            name: 'Current',
            data: [85, 92, 88, 95, 90]
        }, {
            name: 'Benchmark',
            data: [75, 82, 78, 85, 80],
            dashArray: 5
        }],
        chart: {
            type: 'radar',
            height: 300
        },
        xaxis: {
            categories: ['Overall', 'Cost', 'Schedule', 'Safety', 'Quality']
        },
        yaxis: {
            show: false,
            min: 0,
            max: 100
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
        series: [{
            name: 'Actual Cost',
            data: [30, 60, 100, 140]
        }, {
            name: 'Budget',
            data: [35, 70, 105, 150]
        }, {
            name: 'AI Forecast',
            data: [null, null, null, 140, 155],
            dashArray: 5
        }],
        chart: {
            type: 'area',
            height: 300,
            stacked: false
        },
        stroke: {
            curve: 'smooth',
            width: [2, 2, 2]
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: {
                text: 'Cost (Millions $)'
            },
            labels: {
                formatter: (value) => `$${value}M`
            }
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        }
    };

    new ApexCharts(document.querySelector("#costOverviewChart"), options).render();
}

function createScheduleProgressChart() {
    const options = {
        ...commonOptions,
        series: [{
            name: 'Completed',
            data: [7, 7, 15, 3]
        }, {
            name: 'Remaining',
            data: [0, 0, 6, 0]
        }],
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '60%',
                borderRadius: 4,
                dataLabels: {
                    total: {
                        enabled: true,
                        formatter: function (val) {
                            return val + ' days';
                        },
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            }
        },
        colors: ['#2196f3', '#e9ecef'],
        dataLabels: {
            enabled: true,
            formatter: function(val, opts) {
                const seriesName = opts.w.globals.seriesNames[opts.seriesIndex];
                if (seriesName === 'Completed') {
                    return val > 0 ? val + ' days' : '';
                }
                return '';
            }
        },
        xaxis: {
            categories: ['Planning', 'Shutdown', 'Maintenance', 'Startup'],
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        grid: {
            xaxis: {
                lines: { show: true }
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function(val) {
                    return val + ' days';
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
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
        }, {
            name: 'Industry Average',
            data: [0.55, 0.52, 0.50, 0.48],
            dashArray: 5
        }],
        chart: {
            type: 'line',
            height: 300
        },
        stroke: {
            curve: 'smooth',
            width: [3, 2]
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yaxis: {
            title: {
                text: 'Total Recordable Incident Rate'
            },
            min: 0.30,
            max: 0.60,
            tickAmount: 5,
            labels: {
                formatter: (value) => value.toFixed(2)
            }
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        }
    };

    new ApexCharts(document.querySelector("#safetyPerformanceChart"), options).render();
}

// Handle benchmark region changes
document.getElementById('benchmarkRegion').addEventListener('change', function(e) {
    const region = e.target.value;
    // Update charts with new benchmark data
    // This would be implemented based on your data structure
});