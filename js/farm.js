document.addEventListener("DOMContentLoaded", () => {
    // Define actuators state
    const actuators = {
        irrigation: false,
        lights: false,
        ventilation: false,
    };

    // Function to toggle actuator state
    function toggleActuator(actuator) {
        // Toggle the state of the specified actuator
        actuators[actuator] = !actuators[actuator];

        // Update the status display with translated "On" or "Off"
        const statusElement = document.getElementById(`${actuator}-status`);
        if (statusElement) {
            // Use i18next to get the translated values for "On" and "Off"
            const statusText = actuators[actuator] 
                ? i18next.t("actuators.on") // Translated "On"
                : i18next.t("actuators.off"); // Translated "Off"

            statusElement.textContent = statusText;
        }

        // Log the action (or replace with an API call)
        console.log(`Actuator '${actuator}' is now ${actuators[actuator] ? "On" : "Off"}`);
    }

    // Expose the function to the global scope
    window.toggleActuator = toggleActuator;

    let temperatureChart, humidityChart, soilMoistureChart, waterUsageChart, soilPhChart;
     
    function initializeCharts() {
        // Destroy existing charts to avoid duplication
        if (temperatureChart) temperatureChart.destroy();
        if (humidityChart) humidityChart.destroy();
        if (soilMoistureChart) soilMoistureChart.destroy();
        if (waterUsageChart) waterUsageChart.destroy();
        if (soilPhChart) soilPhChart.destroy();

        // Temperature Chart
        const tempCtx = document.getElementById("temperature-chart").getContext("2d");
        temperatureChart = new Chart(tempCtx, {
            type: "line",
            data: {
                labels: i18next.t("farmcharts.times", { returnObjects: true }) || ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
                datasets: [
                    {
                        label: i18next.t("farmcharts.temperatureLabel") || "Temperature (°C)",
                        data: [22, 23, 24, 23, 22],
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true,
                    },
                ],
            },
        });

        // Humidity Chart
        const humidityCtx = document.getElementById("humidity-chart").getContext("2d");
        humidityChart = new Chart(humidityCtx, {
            type: "bar",
            data: {
                labels: i18next.t("farmcharts.times", { returnObjects: true }) || ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
                datasets: [
                    {
                        label: i18next.t("farmcharts.humidityLabel") || "Humidity (%)",
                        data: [50, 55, 60, 57, 52],
                        backgroundColor: "rgba(54, 162, 235, 0.7)",
                    },
                ],
            },
        });

        // Soil Moisture Chart
        const soilMoistureCtx = document.getElementById("soil-moisture-chart").getContext("2d");
        soilMoistureChart = new Chart(soilMoistureCtx, {
            type: "line",
            data: {
                labels: i18next.t("farmcharts.times", { returnObjects: true }) || ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
                datasets: [
                    {
                        label: i18next.t("farmcharts.soilMoistureLabel") || "Soil Moisture (%)",
                        data: [70, 75, 83, 77, 63],
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true,
                    },
                ],
            },
        });

        //Water Usage Chart
        const waterUsageCtx = document.getElementById("water-usage-chart").getContext("2d");
        waterUsageChart = new Chart(waterUsageCtx, {
            type: "doughnut",
            data: {
                labels: i18next.t("farmcharts.waterUsage", { returnObjects: true }) || ["Used", "Remaining"],
                datasets: [
                    {
                        data: [70, 30],
                        backgroundColor: ["#FF6384", "#36A2EB"],
                    },
                ],
            },
        });

        // Soil pH Chart
        const soilPhCtx = document.getElementById("soil-ph-chart").getContext("2d");
        soilPhChart = new Chart(soilPhCtx, {
            type: "radar",
            data: {
                labels: i18next.t("farmcharts.times", { returnObjects: true }) || ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
                datasets: [
                    {
                        label: i18next.t("farmcharts.soilPhLabel") || "Soil pH",
                        data: [6.5, 6.8, 6.7, 6.6, 6.5],
                        borderColor: "rgba(153, 102, 255, 1)",
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        fill: true,
                    },
                ],
            },
        });
    }

    // Initialize charts once i18next is ready
    if (i18next.isInitialized) {
        initializeCharts();
    } else {
        i18next.on("initialized", initializeCharts);
    }

    // Reinitialize charts on language change
    document.getElementById("languageSwitcher").addEventListener("change", function (e) {
        const selectedLang = e.target.value;
        i18next.changeLanguage(selectedLang, function (err, t) {
            if (err) {
                console.error("Language change error:", err);
                return;
            }
            initializeCharts(); // Reinitialize charts with new translations
        });
    });
});
