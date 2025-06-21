document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let accounts = JSON.parse(localStorage.getItem("Accounts")) || [];

    const authButton = document.getElementById("auth-btn");
    const logoutButton = document.getElementById("logout-btn");

    if (!authButton || !logoutButton) {
        console.error("One or more buttons (#auth-btn or #logout-btn) not found!");
        return;
    }

    if (accounts.length === 0) {
        authButton.style.display = "block";
        logoutButton.style.display = "none";
    } else if (user) {
        authButton.style.display = "none";
        logoutButton.style.display = "block";

        logoutButton.onclick = function () {
            localStorage.removeItem("currentUser");

            Toastify({
                text: "Logged Out Successfully!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "gray",
            }).showToast();

            setTimeout(() => {
                logoutButton.style.display = "none";
                authButton.style.display = "block";
                authButton.onclick = function () {
                    window.location.href = "sign-up-sign-in.html";
                };
                window.location.href = "index.html";
            }, 1000);
        };
    } else {
        authButton.style.display = "block";
        logoutButton.style.display = "none";
        
        authButton.onclick = function () {
            window.location.href = "sign-up-sign-in.html";
        };
    }
});

// **Login Form Logic**
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let accounts = JSON.parse(localStorage.getItem('Accounts')) || [];
    const user = accounts.find(acc => acc.email === email && acc.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        Toastify({
            text: `Login Successful! Welcome, ${user.fullName}!`,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "black",
        }).showToast();

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        Toastify({
            text: "Invalid email or password!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
        }).showToast();
    }
});

// **Signup Logic to Allow Multiple Accounts**
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        console.log("Signup form submitted!");

        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            Toastify({
                text: "Passwords do not match!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
            }).showToast();
            return;
        }

        let accounts = JSON.parse(localStorage.getItem('Accounts')) || [];

        if (accounts.some(acc => acc.email === email)) {
            Toastify({
                text: "Email already registered! Try logging in.",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
            }).showToast();
            return;
        }

        accounts.push({ fullName, email, password });
        localStorage.setItem('Accounts', JSON.stringify(accounts));

        Toastify({
            text: "Account Created! You can now log in.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "green",
        }).showToast();

        setTimeout(() => {
            document.getElementById("signup-form").classList.add("hidden");
            document.getElementById("login-form").classList.remove("hidden");
        }, 1000);
    });
});

// **Toggle Between Sign-Up and Login Forms**
document.getElementById("toggle-signup").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("signup-form").classList.remove("hidden");
});

document.getElementById("toggle-login").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
});