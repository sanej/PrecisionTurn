// Updated JavaScript to fix dashboard charts rendering issues

// Wrap everything in a Vue lifecycle hook to ensure the DOM is ready
new Vue({
    el: '#app',
    data: {
        currentView: 'dashboard' // default to the dashboard view
    },
    methods: {
        loadView(view) {
            // This method dynamically loads the view based on currentPage
            fetch(`views/dashboard/${view}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${view}`);
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById('view-container').innerHTML = html;
                    this.$nextTick(() => {
                        this.initializeCharts(); // Call chart initialization after the HTML is loaded and DOM is updated
                    });
                })
                .catch(error => {
                    console.error(error);
                    document.getElementById('view-container').innerHTML = `<p>Could not load view: ${view}</p>`;
                });
        },
        initializeCharts() {
            // CPI Gauge Chart
            if (document.getElementById('cpiGauge')) {
                new Chart(document.getElementById('cpiGauge').getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [0.95, 1.05],
                            backgroundColor: ['#4CAF50', '#E0E0E0']
                        }]
                    },
                    options: {
                        responsive: true,
                        circumference: 180,
                        rotation: -90,
                        plugins: {
                            tooltip: { enabled: false },
                            legend: { display: false }
                        }
                    }
                });
            }

            // SPI Gauge Chart
            if (document.getElementById('spiGauge')) {
                new Chart(document.getElementById('spiGauge').getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [1.05, 0.95],
                            backgroundColor: ['#4CAF50', '#E0E0E0']
                        }]
                    },
                    options: {
                        responsive: true,
                        circumference: 180,
                        rotation: -90,
                        plugins: {
                            tooltip: { enabled: false },
                            legend: { display: false }
                        }
                    }
                });
            }

            // TPI Scatter Chart
            if (document.getElementById('tpiChart')) {
                new Chart(document.getElementById('tpiChart').getContext('2d'), {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'TPI',
                            data: [
                                { x: 'Phase 1', y: 4 },
                                { x: 'Phase 2', y: 3 },
                                { x: 'Phase 3', y: 2 },
                                { x: 'Phase 4', y: 4 }
                            ],
                            backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#4CAF50']
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { type: 'category', position: 'bottom' },
                            y: { beginAtZero: true, max: 5 }
                        }
                    }
                });
            }

            // Safety Incidents Chart
            if (document.getElementById('safetyChart')) {
                new Chart(document.getElementById('safetyChart').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'],
                        datasets: [
                            {
                                label: 'Incidents',
                                data: [2, 1, 3, 0, 1],
                                borderColor: '#F44336',
                                tension: 0.1
                            },
                            {
                                label: 'Target',
                                data: [1, 1, 1, 1, 1],
                                borderColor: '#4CAF50',
                                borderDash: [5, 5],
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true, stepSize: 1 } }
                    }
                });
            }

            // Oil Price Trend Chart
            if (document.getElementById('oilPriceChart')) {
                new Chart(document.getElementById('oilPriceChart').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'],
                        datasets: [{
                            label: 'Oil Price',
                            data: [75, 78, 80, 82, 79],
                            borderColor: '#2196F3',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: false } }
                    }
                });
            }

            // Resource Allocation Chart
            if (document.getElementById('resourceChart')) {
                new Chart(document.getElementById('resourceChart').getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Engineering', 'Maintenance', 'Safety', 'Operations'],
                        datasets: [
                            {
                                label: 'Allocated',
                                data: [85, 95, 70, 90],
                                backgroundColor: '#3F51B5'
                            },
                            {
                                label: 'Total',
                                data: [100, 100, 100, 100],
                                backgroundColor: '#E0E0E0'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true, max: 100 } },
                        plugins: { legend: { display: true } }
                    }
                });
            }
        }
    },
    mounted() {
        // Load default view (dashboard)
        this.loadView(this.currentView);
    }
});