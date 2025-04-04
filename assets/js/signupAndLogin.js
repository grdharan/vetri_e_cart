document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");

    if(form){
        const username = document.getElementById("username");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        const messageBox = document.getElementById("signup-message"); 

        let users = JSON.parse(localStorage.getItem("users")) || [];

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let isValid = true;
            let errorMessage = "";

            if (username.value.trim() === "") {
                isValid = false;
                errorMessage += "❌ Username cannot be empty.<br>";
            }

            if (phone.value.length < 10) {
                isValid = false;
                errorMessage += "❌ Phone number must be at least 10 digits.<br>";
            }

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email.value)) {
                isValid = false;
                errorMessage += "❌ Enter a valid email address.<br>";
            }

            if (password.value.length < 6) {
                isValid = false;
                errorMessage += "❌ Password must be at least 6 characters.<br>";
            }

            if (password.value !== confirmPassword.value) {
                isValid = false;
                errorMessage += "❌ Passwords do not match.<br>";
            }

            const userExists = users.some(user => user.email === email.value || user.phone === phone.value);
            if (userExists) {
                isValid = false;
                errorMessage += "❌ User with this email or phone already exists.<br>";
            }

            if (!isValid) {
                messageBox.style.color = "red";
                messageBox.innerHTML = errorMessage;
                return;
            }

            // Save new user
            const newUser = {
                username: username.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            messageBox.style.color = "green";
            messageBox.innerHTML = "✅ Signup Successful! Redirecting to login...";

            setTimeout(() => {
                window.location.href = "login.html"; 
            }, 2000);

            form.reset();
        });
    }

    const loginForm = document.querySelector(".login-form");
    // document.querySelector(".login-form").addEventListener("submit", function(event) {
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const loginUsername = document.getElementById("login-username").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();
            const messageBox = document.getElementById("login-message");


            let users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(user => user.username.toLowerCase() === loginUsername && user.password === password);

            if (user) {
                messageBox.style.color = "green";
                messageBox.innerHTML = `✅ Login successful! Welcome, <b>${user.username.toUpperCase()}</b>.`;
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.removeItem("cart");

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                messageBox.style.color = "red";
                messageBox.innerHTML = "❌ Invalid username or password!";
            }
        });
    }
});

// for logout

// document.addEventListener("DOMContentLoaded", () => {
//     const userNameBtn = document.getElementById("user-name-btn");
//     const userDropdown = document.getElementById("user-dropdown");
//     const logoutBtn = document.getElementById("logout");

//     // Check if the user is logged in
//     const loggedInUser = localStorage.getItem("loggedInUser");

//     if (loggedInUser) {
//         userNameBtn.textContent = loggedInUser; // Show username instead of "Login"
//         userNameBtn.classList.add("logged-in"); // Add a class for styling if needed
//     } else {
//         userDropdown.style.display = "none"; // Hide dropdown if not logged in
//     }

//     // Logout functionality
//     logoutBtn.addEventListener("click", () => {
//         localStorage.removeItem("loggedInUser"); // Remove user data
//         window.location.reload(); // Refresh page
//     });
// });
