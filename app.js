
const baseURL = "https://dummyjson.com";
const userContainer = document.getElementById("user-container");
const modal = document.getElementById("user-modal");
const modalContent = document.getElementById("modal-content");

const getAllUsers = async () => {
    try {
        const response = await fetch(`${baseURL}/users`);
        const data = await response.json();

        if (data?.users) {
            const userHTML = data.users.map((user) => {
                return `
                        <div class="user-card" onclick="getUserDetails(${user.id})">
                            <div class="user-info-header">
                                <img src="${user.image}" alt="${user.firstName}" class="user-thumb">
                                <div>
                                    <h3 class="user-name">${user.firstName} ${user.lastName}</h3>
                                    <p class="user-title">${user.company.title}</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <span class="badge">View Profile</span>
                                <span class="user-id">ID: #${user.id}</span>
                            </div>
                        </div>
                        `;
            });

            userContainer.innerHTML = userHTML.join("");
        }
    } catch (error) {
        console.log("Error fetching users: ", error);
        userContainer.innerHTML = `<p class="loading-text" style="color: #ef4444;">Failed to load users. Please try again.</p>`;
    }
};

const getUserDetails = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/users/${userId}`);
        const user = await response.json();

        modalContent.innerHTML = `
                    <img src="${user.image}" alt="${user.firstName}" class="modal-avatar">
                    <h2 class="modal-fullname">${user.firstName} ${user.lastName}</h2>
                    <p class="modal-company-title">${user.company.title} at ${user.company.name}</p>
                    
                    <div class="data-list">
                        <div class="data-item">
                            <p class="data-label">Email</p>
                            <p class="data-value">${user.email}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">Phone</p>
                            <p class="data-value">${user.phone}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">Age / Gender</p>
                            <p class="data-value">${user.age} / ${user.gender}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">Birth Date</p>
                            <p class="data-value">${user.birthDate}</p>
                        </div>
                    </div>

                    <div class="address-section">
                        <p class="data-label">Address</p>
                        <p class="data-value">
                            ${user.address.address}, ${user.address.city}, ${user.address.state} (${user.address.postalCode})
                        </p>
                    </div>

                    <button onclick="closeModal()" class="action-btn">
                        Close Profile
                    </button>
                `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    } catch (error) {
        console.log("Error fetching details: ", error);
    }
};

const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
};

window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

getAllUsers();