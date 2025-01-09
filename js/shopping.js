const cart = [];
// Toggle Details
function toggleDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId);
    const cardElement = detailsElement.closest('.card'); // Find the parent card element

    if (detailsElement) {
        if (detailsElement.classList.contains('d-none')) {
            // Show the details section and expand the card height
            detailsElement.classList.remove('d-none');
            cardElement.classList.add('expanded-card');
        } else {
            // Hide the details section and reset the card height
            detailsElement.classList.add('d-none');
            cardElement.classList.remove('expanded-card');
        }
    }
}

// Toggle the cart sidebar visibility
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

// Add a product to the cart
function addToCart(product, price) {
    if (!product || typeof price !== 'number') {
        console.error("Invalid product or price");
        return;
    }

    const existingItem = cart.find((item) => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
    } else {
        cart.push({ product, price, quantity: 1, total: price });
    }
    updateCartDisplay();
}

// Update the cart display in the sidebar
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            ${i18next.t(item.product)} - ${item.price} ${i18next.t('currency')}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                ${i18next.t('remove')}
            </button>
        `;
        cartList.appendChild(li);
    });

    document.getElementById('cart-count').innerText = cart.length;
    const cartTotal = calculateGlobalCartTotal();
    document.getElementById('cart-total').innerText = `${cartTotal} ${i18next.t('currency')}`;
}

// Remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Clear the entire cart
function clearCart() {
    cart.length = 0;
    updateCartDisplay();
}

// Confirm the order and display the table
function confirmOrder() {
    const orderTable = document.getElementById('order-table');
    const orderTableBody = orderTable.querySelector('tbody');
    const orderTableFooter = orderTable.querySelector('tfoot');

    orderTableBody.innerHTML = ''; // Clear the table body

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i18next.t(item.product)}</td>
            <td>${item.price} ${i18next.t('currency')}</td>
            <td>
                <input type="number" class="form-control" value="${item.quantity}" min="1"
                       data-index="${index}" onchange="updateProductTotal(${index}, this.value)">
            </td>
            <td id="${item.product}-total">${item.total} ${i18next.t('currency')}</td>
        `;
        orderTableBody.appendChild(row);
    });

    // Create or update the footer for total price
    if (!orderTableFooter) {
        const footer = document.createElement('tfoot');
        footer.innerHTML = `
            <tr>
                <td colspan="3" class="text-end"><strong>${i18next.t('total_price')}</strong></td>
                <td id="cart-total-footer">${calculateGlobalCartTotal()} ${i18next.t('currency')}</td>
            </tr>
        `;
        orderTable.appendChild(footer);
    } else {
        const totalElement = document.getElementById('cart-total-footer');
        totalElement.innerText = `${calculateGlobalCartTotal()} ${i18next.t('currency')}`;
    }

    document.getElementById('order-section').style.display = 'block';
    document.getElementById('customer-form').scrollIntoView({ behavior: 'smooth' });
}

// Update the total for a specific product
function updateProductTotal(index, quantity) {
    const item = cart[index];
    quantity = Math.max(1, parseInt(quantity) || 1); // Ensure valid quantity
    item.quantity = quantity;
    item.total = item.price * quantity;

    const totalElement = document.getElementById(`${item.product}-total`);
    if (totalElement) {
        totalElement.innerText = `${item.total} ${i18next.t('currency')}`;
    }

    updateGlobalCartTotal();
}

// Calculate the global cart total
function calculateGlobalCartTotal() {
    return cart.reduce((acc, item) => acc + item.total, 0);
}

// Update the global cart total in the table footer
function updateGlobalCartTotal() {
    const totalPrice = calculateGlobalCartTotal();
    const totalElement = document.getElementById('cart-total-footer');
    if (totalElement) {
        totalElement.innerText = `${totalPrice} ${i18next.t('currency')}`;
    }
}

// Submit the order
document.getElementById('customer-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const customerData = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        deliveryDate: document.getElementById('delivery-date').value,
        address: document.getElementById('customer-address').value,
    };

    const orderData = {
        customer: customerData,
        items: cart.map(({ product, price, quantity, total }) => ({ product, price, quantity, total })),
    };

    fetch('https://farm-server-o11v.onrender.com/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
        .then((response) => {
            if (response.ok) {
                alert(i18next.t('order_success'));
                document.getElementById('customer-form').reset();
                document.getElementById('order-section').style.display = 'none';
                clearCart();
            } else {
                alert(i18next.t('order_failure'));
            }
        })
        .catch(() => alert(i18next.t('order_error')));
});
