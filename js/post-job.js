const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {

            alert("Please login first.");

            window.location.href = "login.html";

            return;

        }

        const job = {

            employerId: currentUser.id,

            jobTitle: document.getElementById("jobTitle").value.trim(),

            companyName: document.getElementById("companyName").value.trim(),

            category: document.getElementById("category").value.trim(),

            employmentType: document.getElementById("employmentType").value,

            location: document.getElementById("location").value.trim(),

            salary: document.getElementById("salary").value.trim(),

            qualification: document.getElementById("qualification").value.trim(),

            experience: document.getElementById("experience").value.trim(),

            description: document.getElementById("description").value.trim(),

            deadline: document.getElementById("deadline").value

        };

        try {

            const response = await fetch("http://localhost:3000/api/jobs", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(job)

            });

            const data = await response.json();

            if (data.success) {

                alert("Job posted successfully!");

                jobForm.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to the server.");

        }

    });

}