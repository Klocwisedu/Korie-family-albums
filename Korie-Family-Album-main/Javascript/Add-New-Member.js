let users = JSON.parse(localStorage.getItem("users")) || [];

// ==== FORM SUBMISSION ====
function submitForm() {
    const form = document.getElementById("myForm");

    const firstName = form.elements["firstname"].value.trim();
    const lastName = form.elements["lastname"].value.trim();
    const sideOfFamily = form.elements["country"].value;
    const fileUpload = form.elements["fileUpload"].files[0];
    const description = form.elements["description"].value.trim();
    const descriptionInput = form.elements["description"];

    if (!description) {
        descriptionInput.style.border = "2px solid red";
        descriptionInput.focus();
        return;
    } else {
        descriptionInput.style.border = "";
    }

    if (fileUpload) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64Image = event.target.result;

            const userData = {
                firstName,
                lastName,
                sideOfFamily,
                description,
                fileUpload: base64Image,
            };

            users = [...users, userData];
            localStorage.setItem("users", JSON.stringify(users));
            form.reset();
            renderUsers();

            // Redirect based on sideOfFamily
            redirectByFamily(sideOfFamily);
        };
        reader.readAsDataURL(fileUpload);
    } else {
        const userData = {
            firstName,
            lastName,
            sideOfFamily,
            description,
            fileUpload: null,
        };

        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        form.reset();
        renderUsers();

        // Redirect based on sideOfFamily
        redirectByFamily(sideOfFamily);
    }
}

// ==== FAMILY REDIRECTION ====
function redirectByFamily(sideOfFamily) {
    if (sideOfFamily === "Paternal") {
        window.location.href = "Paternal-Side.html";
    } else if (sideOfFamily === "Maternal") {
        window.location.href = "Maternal-Side.html";
    } else if (sideOfFamily === "Custom") {
        window.location.href = "Custom-side.html";
    } else {
        window.location.href = "index.html";
    }
}

// ==== RENDER USERS ====
function renderUsers() {
    const PaternalMembersDiv = document.getElementById("PaternalDiv");
    if (!PaternalMembersDiv) return;

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const PaternalUsersFiltered = allUsers.filter(user => user.sideOfFamily === "Paternal");

    let html = '';
    PaternalUsersFiltered.forEach((Member, index) => {
        html += `
        <div class="MemberDiv" id="PaternalMember-${index}" style="position: relative; padding: 20px; border: 1px solid #ccc; border-radius: 10px; margin-bottom: 20px;">
            <button 
                onclick="deletePaternalMember(${index})"
                style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: transparent;
                    border: none;
                    color: #333;
                    font-size: 22px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: color 0.3s ease;
                "
                title="Delete Member"
            >×</button>
            <div class="Member-container">
                <img class="Member-Img" src="${Member.fileUpload}" alt="Member Image" />
                <p>${Member.firstName} ${Member.lastName}</p>
                <p>${Member.description}</p>
            </div>
        </div>
        `;
    });

    if (PaternalUsersFiltered.length === 0) {
        Toastify({
            text: "No family members found. Try adding a family member.",
            duration: 4000,
            gravity: "top",
            position: "center",
            style: {
                background: "#444",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "bold",
            },
        }).showToast();

        PaternalMembersDiv.innerHTML = "";
    } else {
        PaternalMembersDiv.innerHTML = html;
    }
}

// ==== DELETE FUNCTION ====
function deletePaternalMember(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const PaternalUsersFiltered = users.filter(user => user.sideOfFamily === "Paternal");

    PaternalUsersFiltered.splice(index, 1);

    const updatedUsers = users.filter(user =>
        user.sideOfFamily !== "Paternal" || PaternalUsersFiltered.includes(user)
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    renderUsers();

    Toastify({
        text: "Member deleted!",
        duration: 3000,
        backgroundColor: "green",
    }).showToast();
}

// ==== SIGN-IN POPUP ====
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        const popup = document.createElement("div");
        popup.innerHTML = `
            <style>
                #popup-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                #popup-message {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                    max-width: 300px;
                }
                #popup-message p {
                    font-size: 16px;
                    color: black;
                }
                #popup-signin {
                    background: black;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    margin: 10px 5px 0;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                #popup-signin:hover {
                    background: green;
                }
            </style>
            <div id="popup-container">
                <div id="popup-message">
                    <p>Please <strong>sign in</strong> to access this feature.</p>
                    <button id="popup-signin">Sign In</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("popup-signin").addEventListener("click", () => {
            window.location.href = "sign-up-sign-in.html";
        });
    }

    renderUsers(); // Auto-load members on page load
});
