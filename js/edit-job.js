const id = Number(localStorage.getItem("editJobId"));

async function loadJob() {
    try {
        const response = await fetch(`https://job-recruitment-portal-1.onrender.com/api/jobs/details/${id}`);
        const data = await response.json();

        if (data.success && data.job) {
            const job = data.job;
            document.getElementById("editTitle").value = job.title || job.jobTitle;
            document.getElementById("editSalary").value = job.salary;

            document.getElementById("editJobForm").addEventListener("submit", async function(e){
                e.preventDefault();

                const updatedJob = {
                    jobTitle: document.getElementById("editTitle").value,
                    companyName: job.companyName || job.company,
                    location: job.location,
                    category: job.category,
                    salary: document.getElementById("editSalary").value,
                    employmentType: job.employmentType,
                    qualification: job.qualification,
                    experience: job.experience,
                    description: job.description,
                    deadline: job.deadline
                };

                const updateResponse = await fetch(`https://job-recruitment-portal-1.onrender.com/api/jobs/update/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedJob)
                });

                const updateData = await updateResponse.json();

                if (updateData.success) {
                    alert("Job updated successfully!");
                    window.location.href = "manage-jobs.html";
                } else {
                    alert(updateData.message || "Unable to update job.");
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

loadJob();