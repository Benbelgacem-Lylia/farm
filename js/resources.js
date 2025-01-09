document.addEventListener("DOMContentLoaded", function () {
    let charts = null;
  
    // Function to initialize all charts
    function initializeCharts() {
      const landAreaCtx = document.getElementById("landAreaChart").getContext("2d");
      const workersCtx = document.getElementById("workersChart").getContext("2d");
      const animalsCtx = document.getElementById("animalsChart").getContext("2d");
      const productsCtx = document.getElementById("productsChart").getContext("2d");
      const plantsCtx = document.getElementById("plantsChart").getContext("2d");
  
      // Define charts
      const landAreaChart = new Chart(landAreaCtx, {
        type: "pie",
        data: {
          labels: i18next.t("charts.landArea", { returnObjects: true }) || [],
          datasets: [{
            data: [500, 300, 200],
            backgroundColor: ["#007bff", "#28a745", "#ffc107"],
            borderColor: ["#007bff", "#28a745", "#ffc107"],
            borderWidth: 1,
          }],
        },
        options: { responsive: true },
      });
  
      const workersChart = new Chart(workersCtx, {
        type: "bar",
        data: {
          labels: i18next.t("charts.workers", { returnObjects: true }) || [],
          datasets: [{
            label: i18next.t("charts.workersLabel") || "",
            data: [120, 40, 20],
            backgroundColor: "#007bff",
            borderColor: "#0056b3",
            borderWidth: 1,
          }],
        },
        options: { responsive: true },
      });
  
      const animalsChart = new Chart(animalsCtx, {
        type: "doughnut",
        data: {
          labels: i18next.t("charts.animals", { returnObjects: true }) || [],
          datasets: [{
            data: [100, 50, 30, 200],
            backgroundColor: ["#dc3545", "#ffc107", "#17a2b8", "#28a745"],
            borderColor: ["#dc3545", "#ffc107", "#17a2b8", "#28a745"],
            borderWidth: 1,
          }],
        },
        options: { responsive: true },
      });
  
      const productsChart = new Chart(productsCtx, {
        type: "bar",
        data: {
          labels: i18next.t("charts.products", { returnObjects: true }) || [],
          datasets: [{
            label: i18next.t("charts.productsLabel") || "",
            data: [500, 300, 400, 100],
            backgroundColor: "#ffc107",
            borderColor: "#e0a800",
            borderWidth: 1,
          }],
        },
        options: { responsive: true },
      });
  
      const plantsChart = new Chart(plantsCtx, {
        type: "pie",
        data: {
          labels: i18next.t("charts.plants", { returnObjects: true }) || [],
          datasets: [{
            data: [250, 150, 100],
            backgroundColor: ["#28a745", "#007bff", "#17a2b8"],
            borderColor: ["#28a745", "#007bff", "#17a2b8"],
            borderWidth: 1,
          }],
        },
        options: { responsive: true },
      });
  
      return { landAreaChart, workersChart, animalsChart, productsChart, plantsChart };
    }
  
    // Function to set up charts
    function setupCharts() {
      if (charts) {
        // Destroy existing charts
        Object.values(charts).forEach(chart => chart.destroy());
      }
      charts = initializeCharts();
    }
  
    // Ensure charts are initialized after translations are loaded
    i18next.on("initialized", () => {
      setupCharts();
    });
  
    // Listen for language changes
    document.getElementById("languageSwitcher").addEventListener("change", function (e) {
      const selectedLang = e.target.value;
      i18next.changeLanguage(selectedLang, function () {
        setupCharts(); // Reinitialize charts after language change
      });
    });
  });
  