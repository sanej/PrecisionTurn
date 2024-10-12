// Modernized JavaScript for Dashboard Charts

document.addEventListener('DOMContentLoaded', function() {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                        family: 'Roboto, sans-serif'
                    },
                    color: '#333'
                }
            },
            tooltip: {
                bodyFont: {
                    family: 'Roboto, sans-serif'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#555',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#555',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }
    };

    // Turnaround Performance Index Chart
    if (document.getElementById('tpiChart')) {
        new Chart(document.getElementById('tpiChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Good', 'Average', 'Poor'],
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // Cost Performance Index Chart
    if (document.getElementById('cpiChart')) {
        new Chart(document.getElementById('cpiChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Performance'],
                datasets: [{
                    data: [0.9, 0.1],
                    backgroundColor: ['#66BB6A', '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Schedule Performance Index Chart
    if (document.getElementById('spiChart')) {
        new Chart(document.getElementById('spiChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Performance'],
                datasets: [{
                    data: [1.05, 0.95],
                    backgroundColor: ['#FFA726', '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Safety Metrics Chart
    if (document.getElementById('safetyChart')) {
        new Chart(document.getElementById('safetyChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Incidents',
                    data: [2, 1, 3, 0, 1],
                    borderColor: '#EF5350',
                    backgroundColor: 'rgba(239, 83, 80, 0.2)',
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#EF5350'
                }]
            },
            options: chartOptions
        });
    }

    // Resource Allocation Chart
    if (document.getElementById('resourceChart')) {
        new Chart(document.getElementById('resourceChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Engineering', 'Maintenance', 'Safety', 'Operations'],
                datasets: [{
                    label: 'Allocated Resources',
                    data: [85, 95, 70, 90],
                    backgroundColor: ['#3F51B5', '#5C6BC0', '#7986CB', '#9FA8DA'],
                    borderRadius: 5
                }]
            },
            options: chartOptions
        });
    }

    // Energy Consumption & Emissions Chart
    if (document.getElementById('energyChart')) {
        new Chart(document.getElementById('energyChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Energy Consumption',
                    data: [200, 180, 210, 190, 170],
                    backgroundColor: '#29B6F6',
                    borderRadius: 5
                }]
            },
            options: chartOptions
        });
    }

    // Top Vendor Spend Chart
    if (document.getElementById('vendorSpendChart')) {
        new Chart(document.getElementById('vendorSpendChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'],
                datasets: [{
                    label: 'Spend ($)',
                    data: [50000, 30000, 40000, 25000],
                    backgroundColor: '#AB47BC',
                    borderRadius: 5
                }]
            },
            options: chartOptions
        });
    }

    // Tasks Progress by Team Chart
    if (document.getElementById('tasksProgressChart')) {
        new Chart(document.getElementById('tasksProgressChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Team A', 'Team B', 'Team C', 'Team D'],
                datasets: [{
                    label: 'Progress (%)',
                    data: [70, 80, 60, 90],
                    borderColor: '#FF7043',
                    backgroundColor: 'rgba(255, 112, 67, 0.2)',
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#FF7043'
                }]
            },
            options: chartOptions
        });
    }

    // Turnaround Alerts Chart
    if (document.getElementById('turnaroundAlertsChart')) {
        new Chart(document.getElementById('turnaroundAlertsChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Alert 1', 'Alert 2', 'Alert 3', 'Alert 4'],
                datasets: [{
                    label: 'Severity',
                    data: [3, 4, 2, 5],
                    backgroundColor: '#FF5252',
                    borderRadius: 5
                }]
            },
            options: chartOptions
        });
    }
});