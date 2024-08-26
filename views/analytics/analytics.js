document.addEventListener('DOMContentLoaded', function() {
    // Performance Over Time Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Performance',
                data: [10, 20, 30, 40, 50, 60],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });

    // Budget vs Actual Expenditure Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(budgetCtx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Budget',
                    data: [100000, 150000, 120000, 130000],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Actual',
                    data: [90000, 140000, 130000, 120000],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        }
    });

    // Task Completion Rate Chart
    const taskCompletionCtx = document.getElementById('taskCompletionChart').getContext('2d');
    const taskCompletionChart = new Chart(taskCompletionCtx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'In Progress', 'Pending'],
            datasets: [{
                data: [60, 25, 15],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Safety Incidents Trend Chart
    const safetyIncidentsCtx = document.getElementById('safetyIncidentsChart').getContext('2d');
    const safetyIncidentsChart = new Chart(safetyIncidentsCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Incidents',
                data: [2, 1, 5, 0, 3, 1],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }]
        }
    });
});