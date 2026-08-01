const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const role = document.getElementById("loginRole").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        // EMPLOYER LOGIN
        if (role === "employer") {

            try {

                const response = await fetch("https://job-recruitment-portal-1.onrender.com/api/employers/login", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        email,

                        password

                    })

                });

                const data = await response.json();

                if (data.success) {

                    localStorage.setItem("currentUser", JSON.stringify(data.employer));

                    alert("Login Successful!");

                    window.location.href = "employer-dashboard.html";

                } else {

                    alert(data.message);

                }

            } catch (error) {

                console.error(error);

                alert("Unable to connect to server.");

            }

            return;

        }

        // JOB SEEKER LOGIN (Still Local Storage)

        let users = JSON.parse(localStorage.getItem("jobSeekers")) || [];

        const user = users.find(user =>

            user.email === email &&
            user.password === password

        );

        if (user) {

            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Login Successful!");

            window.location.href = "jobs.html";

        } else {

            alert("Invalid Email or Password.");

        }

    });

}

// ==============================
// JOB SEEKER REGISTRATION
// ==============================

const jobSeekerForm = document.getElementById("jobSeekerForm");

if (jobSeekerForm) {

    jobSeekerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const qualification = document.getElementById("qualification").value.trim();
        const skills = document.getElementById("skills").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        let users = JSON.parse(localStorage.getItem("jobSeekers")) || [];

        const exists = users.some(user => user.email === email);

        if (exists) {

            alert("Email already exists.");

            return;

        }

        const newUser = {

            id: Date.now(),
            fullName,
            email,
            phone,
            qualification,
            skills,
            password,
            role: "jobSeeker"

        };

        users.push(newUser);

        localStorage.setItem("jobSeekers", JSON.stringify(users));

        showToast("Registration successful!");

        setTimeout(() => {

            window.location.href = "login.html"

        }, 2000);

    });

}

// ==============================
// EMPLOYER REGISTRATION
// ==============================

const employerForm = document.getElementById("employerForm");

if (employerForm) {

    employerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const companyName = document.getElementById("companyName").value.trim();
        const email = document.getElementById("companyEmail").value.trim();
        const phone = document.getElementById("companyPhone").value.trim();
        const address = document.getElementById("companyAddress").value.trim();
        const description = document.getElementById("companyDescription").value.trim();
        const password = document.getElementById("companyPassword").value;
        const confirmPassword = document.getElementById("companyConfirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await fetch("https://job-recruitment-portal-1.onrender.com/api/employers/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    companyName,
                    email,
                    phone,
                    address,
                    description,
                    password
                })

            });

            const data = await response.json();

            if (data.success) {

                alert(data.message);

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to the server.");

        }

    });

}
// ==============================
// LOGOUT
// ==============================

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}