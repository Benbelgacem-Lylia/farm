window.onload = function () {
    // Chart.js: Create circular charts for water, electricity, and solar production
    const createCircularChart = (ctx, percentage, color) => {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [percentage, 100 - percentage],
                        backgroundColor: [color, '#eaeaea'],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                cutout: '70%',
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },
                },
            },
        });
    };

    // Create charts
    createCircularChart(document.getElementById('waterChart'), 65, '#6495ED'); // Water: 65%
    createCircularChart(document.getElementById('electricityChart'), 80, '#f39c12'); // Electricity: 80%
    createCircularChart(document.getElementById('productionChart'), 90, '#2ecc71'); // Production: 90%
};
