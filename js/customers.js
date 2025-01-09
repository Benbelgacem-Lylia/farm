document.addEventListener("DOMContentLoaded", () => {
    fetchCustomers();
});

async function fetchCustomers() {
    try {
        const response = await axios.get('https://farm-server-o11v.onrender.com/customer');
        const customers = response.data;
        populateTable(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
}

function populateTable(customers) {
    const customersTableBody = document.getElementById("customersTable").getElementsByTagName("tbody")[0];
    customersTableBody.innerHTML = "";

    customers.forEach(customer => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
        `;

        customersTableBody.appendChild(row);
    });
}
