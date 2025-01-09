document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://farm-server-o11v.onrender.com/users";
    const usersTable = document.getElementById("usersTable");
    const addUserForm = document.getElementById("addUserForm");
    const addUserBtn = document.getElementById("addUserBtn");
    const userForm = document.getElementById("userForm");
    const cancelBtn = document.getElementById("cancelBtn");
    let editingUserId = null;

    // Fetch and display users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            const users = response.data;
            populateTable(users);
        } catch (error) {
            alert(i18next.t("errorFetchingUsers"));
        }
    };

    // Populate table with users
    const populateTable = (users) => {
        usersTable.innerHTML = "";
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.password}</td>
                <td>
                    <button class="btn btn-sm btn-edit editBtn" data-id="${user.id}" data-i18n="edit">Edit</button>
                    <button class="btn btn-sm btn-delete deleteBtn" data-id="${user.id}" data-i18n="delete">Delete</button>
                </td>
            `;
            usersTable.appendChild(row);
        });

        // Attach event listeners for edit and delete buttons
        document.querySelectorAll(".editBtn").forEach((btn) =>
            btn.addEventListener("click", handleEditUser)
        );
        document.querySelectorAll(".deleteBtn").forEach((btn) =>
            btn.addEventListener("click", handleDeleteUser)
        );
    };

    // Show the Add User form
    const showForm = (user = null) => {
        addUserForm.style.display = "block";
        if (user) {
            document.getElementById("firstName").value = user.firstName;
            document.getElementById("lastName").value = user.lastName;
            document.getElementById("email").value = user.email;
            document.getElementById("role").value = user.role;
            document.getElementById("password").value = user.password;
        } else {
            userForm.reset();
        }
    };

    // Hide the Add User form
    const hideForm = () => {
        addUserForm.style.display = "none";
        userForm.reset();
        editingUserId = null;
    };

    // Add a new user
    const addUser = async (userData) => {
        try {
            await axios.post(apiUrl, userData);
            alert(i18next.t("userAddedSuccess"));
            fetchUsers();
            hideForm();
        } catch (error) {
            alert(i18next.t("errorAddingUser"));
        }
    };

    // Update an existing user
    const updateUser = async (userId, userData) => {
        try {
            await axios.put(`${apiUrl}/${userId}`, userData);
            alert(i18next.t("userUpdatedSuccess"));
            fetchUsers();
            hideForm();
        } catch (error) {
            alert(i18next.t("errorUpdatingUser"));
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${apiUrl}/${userId}`);
            alert(i18next.t("userDeletedSuccess"));
            fetchUsers();
        } catch (error) {
            alert(i18next.t("errorDeletingUser"));
        }
    };

    // Handle form submission
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            role: document.getElementById("role").value,
            password: document.getElementById("password").value,
        };

        if (editingUserId) {
            updateUser(editingUserId, userData);
        } else {
            addUser(userData);
        }
    });

    // Handle user edit
    const handleEditUser = async (e) => {
        const userId = e.target.dataset.id;
        try {
            const response = await axios.get(`${apiUrl}/${userId}`);
            const user = response.data;
            editingUserId = userId;
            showForm(user);
        } catch (error) {
            alert(i18next.t("errorFetchingUser"));
        }
    };

    // Handle user delete
    const handleDeleteUser = (e) => {
        const userId = e.target.dataset.id;
        const confirmation = confirm(i18next.t("confirmDelete"));
        if (confirmation) {
            deleteUser(userId);
        }
    };

    // Add user button click event
    addUserBtn.addEventListener("click", () => {
        editingUserId = null;
        showForm();
    });

    // Cancel button click event
    cancelBtn.addEventListener("click", hideForm);

    // Initial fetch
    fetchUsers();
});
