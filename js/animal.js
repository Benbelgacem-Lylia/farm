document.addEventListener("DOMContentLoaded", () => {
    // Example initial data
    const vetData = [
      { id: "A001", lastVerification: "2024-12-01", nextScheduled: "2024-12-28" },
      { id: "A002", lastVerification: "2024-12-05", nextScheduled: "2024-12-29" },
      { id: "A003", lastVerification: "2024-12-10", nextScheduled: "2025-01-05" },
    ];
  
    // Populate table
    const tableBody = document.getElementById("vet-schedule-table");
    vetData.forEach(animal => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${animal.id}</td>
        <td>${animal.lastVerification}</td>
        <td>${animal.nextScheduled}</td>
      `;
      tableBody.appendChild(row);
    });
  });
  
  // Open date picker
  function openDatePicker() {
    document.getElementById("date-picker-container").classList.remove("hidden");
  }
  
  // Close date picker
  function closeDatePicker() {
    document.getElementById("date-picker-container").classList.add("hidden");
  }
  
  // Schedule new verification
  function scheduleVerification() {
    const scheduleDate = document.getElementById("schedule-date").value;
    if (!scheduleDate) {
      alert("Please select a date.");
      return;
    }
  
    // Example: Add a new row (replace with dynamic ID for real-world use)
    const tableBody = document.getElementById("vet-schedule-table");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td data-i18n="new">New</td>
      <td data-i18n="today">Today</td>
      <td>${scheduleDate}</td>
    `;
    tableBody.appendChild(newRow);
  
    // Close the picker and reset
    closeDatePicker();
    document.getElementById("schedule-date").value = "";
  }
  