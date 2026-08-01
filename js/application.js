const applicationForm = document.getElementById("applicationForm");

if(applicationForm){

applicationForm.addEventListener("submit", async function(e){
    e.preventDefault();

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    const jobId = Number(localStorage.getItem("selectedJob"));
    const cvInput = document.getElementById("cv");
    const cvFile = cvInput && cvInput.files ? cvInput.files[0] : null;

    if (!jobId || Number.isNaN(jobId)) {
        alert("Please open this page from a job listing first.");
        return;
    }

    if (!cvFile) {
        alert("Please choose a CV file before submitting.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/jobs/details/${jobId}`);
        const data = await response.json();
        const job = data.success ? data.job : null;

        if (!job) {
            alert("Selected job could not be found.");
            return;
        }

        const application = {
            id: Date.now(),
            jobId,
            jobTitle: job.title || job.jobTitle,
            company: job.company || job.companyName,
            employerId: job.employerId,
            applicantName: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            cv: cvFile.name,
            coverLetter: document.getElementById("coverLetter").value,
            date: new Date().toLocaleDateString()
        };

        applications.push(application);
        localStorage.setItem("applications", JSON.stringify(applications));

        alert("Application submitted successfully!");
        window.location.href = "application-success.html";
    } catch (error) {
        console.error("Application submit failed:", error);
        alert("Unable to submit application. Please try again.\n" + (error.message || ""));
    }
});

}