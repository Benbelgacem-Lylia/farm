const alertMessage = document.getElementById("alertMessage");
const taskTableBody = document.querySelector("#taskTable tbody");
const chartCanvas = document.getElementById("animalChart");
let animalChart = null;

/**
 * Fetch animal data based on the selected animal and update the UI.
 * @param {string} selectedAnimal - The ID of the selected animal.
 */
async function fetchAnimalData(selectedAnimal) {
  try {
    const response = await axios.get("https://farm-server-o11v.onrender.com/animals");
    const animals = response.data;

    // Reset alerts and tasks
    resetUI();

    const animal = animals.find((item) => item.id === selectedAnimal);

    if (animal) {
      const { parameters, task, type } = animal;

      if (selectedAnimal === "Cow_2") {
        const alertText = i18next.t("alt.message");
        displayAlert(alertText);

        const row = document.createElement("tr");
        row.classList.add("alert-task");
        row.innerHTML = `
          <td>${i18next.t("tsk.pending")} ${i18next.t("tsk.monitor_health")}</td>
          <td>${i18next.t("stat.pending")}</td>`;
        taskTableBody.appendChild(row);
      }

      addCompletedTasks([
        i18next.t("tsk.monitor_health"),
        i18next.t("tsk.check_rumination"),
        i18next.t("tsk.update_records"),
      ]);

      updateAnimalChart(type, parameters);
    }
  } catch (error) {
    console.error("Error fetching animal data:", error);
  }
}

/**
 * Reset UI elements such as alerts and task table.
 */
function resetUI() {
  alertMessage.textContent = "";
  alertMessage.classList.remove("alert-message");
  taskTableBody.innerHTML = "";
}

/**
 * Display an alert message.
 * @param {string} message - The alert message to display.
 */
function displayAlert(message) {
  alert(message);
  alertMessage.textContent = message;
  alertMessage.classList.add("alert-message");
}

/**
 * Add completed tasks to the task table.
 * @param {Array<string>} tasks - List of completed task names.
 */
function addCompletedTasks(tasks) {
  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${task}</td><td>${i18next.t("stat.completed")}</td>`;
    taskTableBody.appendChild(row);
  });
}

/**
 * Update the animal chart with provided parameters.
 * @param {string} animalType - The type of the animal.
 * @param {Object} parameters - The parameters for the animal chart.
 */
function updateAnimalChart(animalType, parameters) {
  const dataLabels = [
    i18next.t("cht.temperature"),
    i18next.t("cht.rumination"),
    i18next.t("cht.movement"),
    i18next.t("cht.heart_rate"),
  ];
  const dataValues = Object.values(parameters);

  if (animalChart) {
    animalChart.destroy();
  }

  animalChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: i18next.t("cht.health_parameters", { type: animalType }),
          data: dataValues,
          backgroundColor: ["#fbda04", "#028410", "#ffa500", "#0000ff"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
}

/**
 * Initialize the page content and charts after translations are ready.
 */
function initializePage() {
  const defaultCowId = "Cow_1";
  fetchAnimalData(defaultCowId);
}

// Event listener for animal selection change
document.getElementById("cowSelector").addEventListener("change", (event) => {
  fetchAnimalData(event.target.value);
});

// Initialize the page after DOM and translations are fully loaded
document.addEventListener("DOMContentLoaded", () => {
  i18next.on("initialized", initializePage);
});
