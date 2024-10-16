document.addEventListener('DOMContentLoaded', function() {
    createMultiPlantChart();
    createFinancialMetricsChart();
    createSchedulePerformanceChart();
    createBudgetPerformanceChart();
    createRiskChart();
});

function createMultiPlantChart() {
    var options = {
        series: [{
            name: 'Progress',
            data: [75, 60, 90, 80, 85]
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
            categories: ["Plant A", "Plant B", "Plant C", "Plant D", "Plant E"],
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
            text: 'Turnaround Progress by Plant',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#multiPlantChart"), options);
    chart.render();
}

function createFinancialMetricsChart() {
    var options = {
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
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E'],
        },
        yaxis: {
            title: {
                text: 'Financial Metrics'
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val + "M"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

    var chart = new ApexCharts(document.querySelector("#financialMetricsChart"), options);
    chart.render();
}

function createSchedulePerformanceChart() {
    var options = {
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
                text: 'Days',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0);
                }
            }
        },
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E'],
            labels: {
                rotate: -90
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#schedulePerformanceChart"), options);
    chart.render();
}

function createBudgetPerformanceChart() {
    var options = {
        series: [{
            name: 'Budget Variance (%)',
            data: [-2.5, 1.8, -3.2, 0.5, 2.1]
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
                        color: '#59C3C3'
                    }, {
                        from: 0,
                        to: 100,
                        color: '#F15B46'
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
                text: 'Budget Variance (%)',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(1) + "%";
                }
            }
        },
        xaxis: {
            categories: ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E'],
            labels: {
                rotate: -90
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#budgetPerformanceChart"), options);
    chart.render();
}

function createRiskChart() {
    var options = {
        series: [24.9, 31.1, 7.3, 24.3, 12.4],
        chart: {
            width: '100%',
            height: 350,
            type: 'pie',
        },
        labels: ['Safety', 'Schedule', 'Cost', 'Quality', 'Environmental'],
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

    var chart = new ApexCharts(document.querySelector("#riskChart"), options);
    chart.render();
}