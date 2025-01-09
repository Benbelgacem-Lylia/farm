let productionChart, ingredientChart; // Chart instances

// Function to initialize charts
function initializeCharts() {
  // Destroy existing charts before reinitializing
  if (productionChart) productionChart.destroy();
  if (ingredientChart) ingredientChart.destroy();

  // Example data
  const productionData = [
    { batchId: "B001", date: "2024-12-01", quantity: 500, ingredients: "Corn, Soy, Wheat" },
    { batchId: "B002", date: "2024-12-05", quantity: 300, ingredients: "Barley, Soy" },
    { batchId: "B003", date: "2024-12-10", quantity: 400, ingredients: "Corn, Wheat" },
  ];

  const productionQuantities = productionData.map((entry) => entry.quantity);
  const productionDates = productionData.map((entry) => entry.date);

  const ingredientUsage = {
    Corn: 2,
    Soy: 3,
    Wheat: 2,
    Barley: 1,
  };

  // Translate ingredient labels for charts
  const translatedIngredientLabels = Object.keys(ingredientUsage).map((ingredient) =>
    i18next.t(`procharts.ingredients.${ingredient.toLowerCase()}`) || ingredient
  );

  // Feed Production Chart
  const productionChartCtx = document.getElementById("feed-production-chart").getContext("2d");
  productionChart = new Chart(productionChartCtx, {
    type: "line",
    data: {
      labels: productionDates,
      datasets: [
        {
          label: i18next.t("procharts.feedProductionLabel") || "Feed Production (kg)", // Translated label
          data: productionQuantities,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: { size: 14 },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: i18next.t("procharts.dateAxis") || "Date", // Translated axis title
          },
        },
        y: {
          title: {
            display: true,
            text: i18next.t("procharts.quantityAxis") || "Quantity (kg)", // Translated axis title
          },
        },
      },
    },
  });

  // Ingredient Usage Chart
  const ingredientChartCtx = document.getElementById("ingredient-usage-chart").getContext("2d");
  ingredientChart = new Chart(ingredientChartCtx, {
    type: "bar",
    data: {
      labels: translatedIngredientLabels, // Use translated ingredient labels
      datasets: [
        {
          label: i18next.t("procharts.ingredientUsageLabel") || "Ingredient Usage (Count)", // Translated label
          data: Object.values(ingredientUsage),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: { size: 14 },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: i18next.t("procharts.ingredientAxis") || "Ingredient", // Translated axis title
          },
        },
        y: {
          title: {
            display: true,
            text: i18next.t("procharts.countAxis") || "Count", // Translated axis title
          },
        },
      },
    },
  });

  // Populate table
  updateTable(productionData);
}

// Function to populate the production table
function updateTable(productionData) {
  const tableBody = document.getElementById("production-records");
  tableBody.innerHTML = ""; // Clear existing table rows

  productionData.forEach((entry) => {
    const translatedIngredients = entry.ingredients
      .split(", ")
      .map((ingredient) => i18next.t(`procharts.ingredients.${ingredient.trim().toLowerCase()}`) || ingredient.trim())
      .join(", ");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.batchId}</td>
      <td>${entry.date}</td>
      <td>${entry.quantity}</td>
      <td>${translatedIngredients}</td>
    `;
    tableBody.appendChild(row);
  });

  // Update table headers with translations
  document.querySelectorAll("table thead th").forEach((th, index) => {
    const keys = [
      "procharts.table.batchId",
      "procharts.table.date",
      "procharts.table.quantity",
      "procharts.table.ingredients",
    ];
    th.innerText = i18next.t(keys[index]) || th.innerText;
  });
}

// Open entry form
function openEntryForm() {
  document.getElementById("entry-form-container").classList.remove("hidden");
}

// Close entry form
function closeEntryForm() {
  document.getElementById("entry-form-container").classList.add("hidden");
}

// Add production entry
function addProductionEntry() {
  const batchId = document.getElementById("batch-id").value;
  const productionDate = document.getElementById("production-date").value;
  const quantity = document.getElementById("quantity").value;
  const ingredients = document.getElementById("ingredients").value;

  if (!batchId || !productionDate || !quantity || !ingredients) {
    alert("Please fill all fields.");
    return;
  }

  // Add new entry to the table
  const tableBody = document.getElementById("production-records");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${batchId}</td>
    <td>${productionDate}</td>
    <td>${quantity}</td>
    <td>${ingredients}</td>
  `;
  tableBody.appendChild(newRow);

  // Close the form and reset inputs
  closeEntryForm();
  document.getElementById("batch-id").value = "";
  document.getElementById("production-date").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("ingredients").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Ensure charts are initialized only after i18next is ready
  if (i18next.isInitialized) {
    initializeCharts();
  } else {
    i18next.on("initialized", initializeCharts);
  }

  // Add event listener for language changes
  document.getElementById("languageSwitcher").addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    i18next.changeLanguage(selectedLang, () => {
      initializeCharts(); // Reinitialize charts after language change
    });
  });
});
