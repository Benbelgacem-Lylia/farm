document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.get('https://farm-server-o11v.onrender.com/customer', {
            params: {
                email,
                password
            }
        });

        const customers = response.data;
        if (customers.length > 0) {
            alert(i18next.t('login-success'));
            sessionStorage.setItem('isAuthenticated', 'true'); // Store in session storage
            window.location.href = 'shopping.html'; // Redirect to shopping page
        } else {
            alert(i18next.t('login-failed'));
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
