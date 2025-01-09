// Listen for the login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Fetch user data from the JSON server
    axios.get("https://farm-server-o11v.onrender.com/users")
        .then(response => {
            const users = response.data;

            // Check if user exists with matching email and password
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // User found, save to localStorage and redirect
                localStorage.setItem("user", JSON.stringify(user));
                alert(
                    i18next.t("welcomeMessage", {
                      firstName: user.firstName,
                      lastName: user.lastName,
                      role: user.role,
                    })
                  );
                  
                window.location.href = "./dashboard.html";
            } else {
                // User not found or invalid credentials
                showError(i18next.t("invalidCredentials"));

            }
        })
        .catch(err => {
            // Handle server connection error
            console.error("Error fetching users:", err);
            showError("Unable to connect to the server. Please try again later.");
        });
});

// Display error message
function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}
