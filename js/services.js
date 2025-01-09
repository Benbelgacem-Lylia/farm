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