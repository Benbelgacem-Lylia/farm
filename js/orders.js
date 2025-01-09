document.addEventListener("DOMContentLoaded", () => {
    const ordersTable = document.getElementById("ordersTable").querySelector("tbody");
    const salesChartCtx = document.getElementById("salesChart").getContext("2d");
    let salesChart = null;

    // Function to fetch and populate table rows
    async function fetchAndPopulateOrders() {
        try {
            const response = await axios.get('https://farm-server-o11v.onrender.com/orders');
            const orders = response.data;
            populateTable(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    // Function to populate table rows
    function populateTable(orders) {
        const ordersTable = document.getElementById("ordersTable").getElementsByTagName("tbody")[0];
        orders.forEach(order => {
            order.items.forEach(item => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${order.id}</td> <!-- Corrected: order.id instead of order.orderId -->
                    <td>${order.customer.name}</td>
                    <td>${order.customer.address || 'N/A'}</td> <!-- Placeholder for missing address -->
                    <td>${order.customer.email}</td>
                    <td>${order.customer.phone}</td>
                    <td>${i18next.t(`${item.product}`)}</td>
                    <td>${item.quantity}</td>
                    <td>${(item.total / item.quantity).toFixed(2)}<span data-i18n="currency">DZD</span></td> <!-- Price per unit -->
                    <td>${item.total.toFixed(2)}<span data-i18n="currency">DZD</span></td>
                    <td>${order.customer.deliveryDate}</td>
                    <td>${order.deliveryStatus || 'Pending'}</td> <!-- Placeholder for missing delivery status -->
                `;

                ordersTable.appendChild(row);
            });
        });
    }

    // Generate random sales data for statistics
    function generateSalesData() {
        const months = i18next.t("salescharts.months", { returnObjects: true }) || [];
        if (!months.length) {
            console.error("Months translation missing or not loaded:", months);
        }

        const sales = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000) + 200);
        return { months, sales };
    }

    // Render sales chart
    function renderSalesChart(data) {
        const { months, sales } = data;

        // Destroy the previous chart instance if it exists
        if (salesChart) {
            salesChart.destroy();
        }

        salesChart = new Chart(salesChartCtx, {
            type: "bar",
            data: {
                labels: months,
                datasets: [{
                    label: i18next.t("salescharts.salesLabel") || "Total Sales ($)", // Default fallback
                    data: sales,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 200
                        }
                    }
                }
            }
        });
    }

    // Fetch and populate orders, then render sales chart
    function initializeSalesData() {
        fetchAndPopulateOrders();
        const salesData = generateSalesData();

        if (!salesData.months.length) {
            console.error("Translation for months is missing. Check translation files.");
        }

        renderSalesChart(salesData);
    }

    // Ensure `i18next` is ready before rendering
    if (i18next.isInitialized) {
        initializeSalesData();
    } else {
        i18next.on('initialized', initializeSalesData);
    }

    // Update chart on language change
    document.getElementById("languageSwitcher").addEventListener("change", (event) => {
        const selectedLang = event.target.value;
        i18next.changeLanguage(selectedLang, () => {
            renderSalesChart(generateSalesData()); // Re-render chart with updated translations
        });
    });
});
