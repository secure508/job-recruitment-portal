const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchJob");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let jobs = [];

function displayJobs(list){
    jobsContainer.innerHTML="";

    if(list.length===0){
        jobsContainer.innerHTML="<h3>No jobs found.</h3>";
        return;
    }

    list.forEach(job=>{
        jobsContainer.innerHTML += `
<div class="job-card">
<h3>${job.title || job.jobTitle}</h3>
<p><strong>Category:</strong> ${job.category}</p>
<p><strong>Location:</strong> ${job.location}</p>
<p><strong>Employment:</strong> ${job.employmentType}</p>
<p><strong>Salary:</strong> ${job.salary}</p>
<div class="job-actions">
<button class="edit-btn" onclick="editJob(${job.id})">Edit</button>
<button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
</div>
</div>`;
    });
}

async function loadEmployerJobs() {
    if (!currentUser) return;

    try {
        const response = await fetch(`https://job-recruitment-portal-1.onrender.com/api/jobs/employer-jobs/${currentUser.id}`);
        const data = await response.json();

        if (data.success) {
            jobs = data.jobs || [];
            displayJobs(jobs);
        }
    } catch (error) {
        console.error(error);
    }
}

searchInput.addEventListener("keyup",()=>{
    const keyword=searchInput.value.toLowerCase();
    const filtered=jobs.filter(job=>
        (job.title || job.jobTitle || "").toLowerCase().includes(keyword)
    );
    displayJobs(filtered);
});

async function deleteJob(id){
    if(confirm("Delete this job?")){
        try {
            const response = await fetch(`https://job-recruitment-portal-1.onrender.com/api/jobs/remove/${id}`, { method: "DELETE" });
            const data = await response.json();
            if (data.success) {
                location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function editJob(id){
    localStorage.setItem("editJobId",id);
    window.location.href="edit-job.html";
}

loadEmployerJobs();