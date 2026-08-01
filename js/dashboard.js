const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){
    document.getElementById("welcomeName").innerHTML =
    "Welcome, " + currentUser.companyName;
}

async function loadDashboard() {
    if (!currentUser) return;

    try {
        const response = await fetch(`http://localhost:3000/api/jobs/employer-jobs/${currentUser.id}`);
        const data = await response.json();

        const employerJobs = data.success ? (data.jobs || []) : [];
        document.getElementById("totalJobs").innerHTML = employerJobs.length;
        document.getElementById("activeJobs").innerHTML = employerJobs.length;
    } catch (error) {
        console.error(error);
        document.getElementById("totalJobs").innerHTML = "0";
        document.getElementById("activeJobs").innerHTML = "0";
    }

    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    document.getElementById("applications").innerHTML = applications.length;
}

loadDashboard();