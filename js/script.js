// JavaScript to handle form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Replace YOUR_EMAIL_ADDRESS with your actual email
    const myEmail = "almazraaaljadida93@gmail.com"; 

    // Simulated email-sending process
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: "service_ehd8qpg", // From EmailJS
            template_id: "template_gtq2izt", // From EmailJS
            user_id: "5hi7rmmAh0Tf81TvW",     // From EmailJS
            template_params: {
                to_email: myEmail,         // Your email to receive emails
                from_email: email,
                message: message
            }
        })
    })
    .then(response => {
        if (response.ok) {
            alert(i18next.t("emailSuccess"));
            document.getElementById('contact-form').reset();
        } else {
            alert(i18next.t("emailFailure"));
        }        
    })
    .catch(error => {
        console.error("Error sending email:", error);
        alert("There was an error sending your email. Please try again.");
    });
});
// Add event listener to the Shop link
document.querySelector('.shop-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Check if the user is authenticated
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');

    if (isAuthenticated === 'true') {
        // Redirect to shopping page if authenticated
        window.location.href = 'shopping.html';
    } else {
        // Redirect to login page if not authenticated
        window.location.href = 'customerRegistration.html';
    }
});
