document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('https://farm-server-o11v.onrender.com/customer', {
            firstName,
            lastName,
            email,
            password
        });

        if (response.status === 201) {
            alert(i18next.t('registration-success'));
            window.location.href = 'Customerlogin.html'; // Redirect to login page
        } else {
            alert(i18next.t('registration-failed'));
        }
        
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
    }
});
