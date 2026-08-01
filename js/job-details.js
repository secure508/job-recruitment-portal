const jobId = Number(localStorage.getItem("selectedJob"));
const container = document.getElementById("jobDetails");

window.ensureSelection = function () {
    if (!jobId || Number.isNaN(jobId)) {
        alert("Please open this page from a job listing first.");
        return false;
    }
    return true;
};

if (!jobId || Number.isNaN(jobId)) {
    if (container) {
        container.innerHTML = "<p>Please open this page from a job listing.</p>";
    }
} else {
    async function loadJob() {
        try {
            const response = await fetch(`http://localhost:3000/api/jobs/details/${jobId}`);
            const data = await response.json();

            if (data.success && data.job) {
                const job = data.job;
                container.innerHTML = `
<h2>${job.title || job.jobTitle}</h2>
<p><strong>Company:</strong> ${job.company || job.companyName}</p>
<p><strong>Location:</strong> ${job.location}</p>
<p><strong>Employment Type:</strong> ${job.employmentType}</p>
<p><strong>Salary:</strong> ${job.salary}</p>
<p><strong>Qualification:</strong> ${job.qualification}</p>
<p><strong>Experience:</strong> ${job.experience}</p>
<p><strong>Description:</strong></p>
<p>${job.description}</p>
<p><strong>Deadline:</strong> ${job.deadline}</p>`;
            } else {
                container.innerHTML = "<p>Job not found.</p>";
            }
        } catch (error) {
            console.error(error);
            container.innerHTML = "<p>Unable to load job details.</p>";
        }
    }

    loadJob();
}