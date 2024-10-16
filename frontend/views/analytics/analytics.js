document.addEventListener('DOMContentLoaded', function() {
    createTaskCompletionChart();
    createResourceUtilizationChart();
    createCostBreakdownChart();
    createSafetyIncidentsChart();
    createEquipmentDowntimeChart();
    createVendorPerformanceChart();

    document.getElementById('applyFilters').addEventListener('click', updateCharts);
});

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
            data: [44, 55, 57, 56, 61, 58, 63]
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
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Slips', 'Falls', 'Cuts', 'Burns', 'Strains', 'Exposure', 'Other'],
        },
        yaxis: {
            title: {
                text: 'Number of Incidents'
            }
        },
        fill: {
            opacity: 1
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
            data: [400, 430, 448, 470, 540, 580, 690]
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
            enabled: false
        },
        xaxis: {
            categories: ['Pumps', 'Valves', 'Compressors', 'Heat Exchangers', 'Tanks', 'Pipes', 'Instrumentation'],
        }
    };

    var chart = new ApexCharts(document.querySelector("#equipmentDowntimeChart"), options);
    chart.render();
}

function createVendorPerformanceChart() {
    var options = {
        series: [{
            name: 'On-Time Delivery',
            data: [80, 75, 60, 85, 65, 90, 70]
        }, {
            name: 'Quality Score',
            data: [85, 80, 70, 82, 75, 88, 72]
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
        }
    };

    var chart = new ApexCharts(document.querySelector("#vendorPerformanceChart"), options);
    chart.render();
}

function updateCharts() {
    // This function would update all charts based on the selected time range
    // For now, we'll just log the selected value
    var timeRange = document.getElementById('timeRangeFilter').value;
    console.log('Updating charts for time range:', timeRange);
    // In a real application, you would fetch new data and update each chart
}