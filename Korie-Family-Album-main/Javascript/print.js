// Retrieve all users from local storage
const users = JSON.parse(localStorage.getItem("users")) || [];

// Select the container where images will be displayed
const userContainer = document.getElementById("user-container");

// Define circle parameters
const radius = 200;
const centerX = 250;
const centerY = 250;

let html = "";
users.forEach((user, index, arr) => {
    if (user.fileUpload) { 
        const angle = (index / arr.length) * (2 * Math.PI);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        html += `
        <div class="circle-item" style="top: ${y}px; left: ${x}px;">
            <img src="${user.fileUpload}" alt="User Image">
            <p class="user-name">${user.firstName} ${user.lastName}</p>
        </div>
        `;
    }
});

// Insert into the page
userContainer.innerHTML = html;

function printAlbum() {
    window.print(); // Opens print dialog for the page
}

function goHome() {
    window.location.href = "index.html"; // Redirects to homepage
}

//////
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        console.log("No user logged in, showing popup...");
        document.getElementById("popup-container").style.display = "flex"; // Show popup
    }

    

    // Redirect to sign-in page
    document.getElementById("popup-signin").addEventListener("click", function () {
        window.location.href = "sign-up-sign-in.html";
    });
});
/////
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
                #popup-close:hover { background: red; }
                #popup-signin:hover { background: green; }
            </style>
            <div id="popup-container">
                <div id="popup-message">
                    <p>Please <strong>sign in</strong> to access this feature.</p>
                    <button id="popup-signin">Sign In</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Redirect to sign-in page
        document.getElementById("popup-signin").addEventListener("click", () => {
            window.location.href = "sign-up-sign-in.html";
        });
    }
});