document.addEventListener("DOMContentLoaded", () => {
    // Wait for i18next initialization
    i18next.on("initialized", () => {
      // Example initial training data
      const trainingData = [
        { course: i18next.t("leadership_training"), date: "2024-12-01", time: "10:00 AM", trainer: "John Doe", participants: 20 },
        { course: i18next.t("team_building"), date: "2024-12-05", time: "2:00 PM", trainer: "Jane Smith", participants: 15 },
      ];
  
      // Populate table
      const tableBody = document.getElementById("training-schedule");
      trainingData.forEach((session) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${session.course}</td>
          <td>${session.date}</td>
          <td>${session.time}</td>
          <td>${session.trainer}</td>
          <td>${session.participants}</td>
        `;
        tableBody.appendChild(row);
      });
    });
  
    // Open course form
    function openCourseForm() {
      document.getElementById("course-form-container").classList.remove("hidden");
    }
  
    // Close course form
    function closeCourseForm() {
      document.getElementById("course-form-container").classList.add("hidden");
    }
  
    // Add a new course
    function scheduleCourse() {
      const courseName = document.getElementById("course-name").value;
      const courseDate = document.getElementById("course-date").value;
      const courseTime = document.getElementById("course-time").value;
      const trainerName = document.getElementById("trainer-name").value;
      const participants = document.getElementById("participants").value;
  
      if (!courseName || !courseDate || !courseTime || !trainerName || !participants) {
        alert(i18next.t("fill_all_fields")); // Translate alert message
        return;
      }
  
      // Add new entry to the table
      const tableBody = document.getElementById("training-schedule");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${courseName}</td>
        <td>${courseDate}</td>
        <td>${courseTime}</td>
        <td>${trainerName}</td>
        <td>${participants}</td>
      `;
      tableBody.appendChild(newRow);
  
      // Close the form and reset inputs
      closeCourseForm();
      document.getElementById("course-name").value = "";
      document.getElementById("course-date").value = "";
      document.getElementById("course-time").value = "";
      document.getElementById("trainer-name").value = "";
      document.getElementById("participants").value = "";
    }
  
    // Expose functions to the global scope
    window.openCourseForm = openCourseForm;
    window.closeCourseForm = closeCourseForm;
    window.scheduleCourse = scheduleCourse;
  });
  