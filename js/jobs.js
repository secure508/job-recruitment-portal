alert("jobs.js loaded");
console.log("jobs.js loaded");
let jobs = [];

const jobsContainer = document.getElementById("jobsContainer");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

async function loadJobs() {
    try {
       const response = await fetch("https://job-recruitment-portal-production.up.railway.app/api/jobs");
        const data = await response.json();

        if (data.success) {
            jobs = data.jobs || [];
            populateFilters();
            displayJobs(jobs);
        } else {
            jobsContainer.innerHTML = "<h2>Unable to load jobs.</h2>";
        }
    } catch (error) {
        console.error(error);
        jobsContainer.innerHTML = "<h2>Unable to connect to the server.</h2>";
    }
}

function populateFilters(){
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    typeFilter.innerHTML = '<option value="">All Types</option>';

    const categories=[...new Set(jobs.map(job=>job.category))];
    const locations=[...new Set(jobs.map(job=>job.location))];
    const types=[...new Set(jobs.map(job=>job.employmentType))];

    categories.forEach(cat=>{
        categoryFilter.innerHTML+=`<option value="${cat}">${cat}</option>`;
    });

    locations.forEach(loc=>{
        locationFilter.innerHTML+=`<option value="${loc}">${loc}</option>`;
    });

    types.forEach(type=>{
        typeFilter.innerHTML+=`<option value="${type}">${type}</option>`;
    });
}

function displayJobs(list){
    jobsContainer.innerHTML="";

    if(list.length===0){
        jobsContainer.innerHTML="<h2>No jobs available.</h2>";
        return;
    }

    list.forEach(job=>{
        jobsContainer.innerHTML+=`
<div class="job-card">
<div class="company-logo">
<i class="fas fa-building"></i>
</div>
<h2>${job.title || job.jobTitle}</h2>
<p><strong>${job.company || job.companyName}</strong></p>
<p><i class="fas fa-location-dot"></i> ${job.location}</p>
<p>${job.employmentType}</p>
<p>${job.salary}</p>
<button class="btn btn-primary" onclick="viewJob(${job.id})">View Details</button>
</div>`;
    });
}

function filterJobs(){
    const keyword=searchInput.value.toLowerCase();
    const category=categoryFilter.value;
    const location=locationFilter.value;
    const type=typeFilter.value;

    const filtered=jobs.filter(job=>{
        const title = (job.title || job.jobTitle || "").toLowerCase();
        return (
            title.includes(keyword)
            && (category===""||job.category===category)
            && (location===""||job.location===location)
            && (type===""||job.employmentType===type)
        );
    });

    displayJobs(filtered);
}

searchInput.addEventListener("keyup",filterJobs);
categoryFilter.addEventListener("change",filterJobs);
locationFilter.addEventListener("change",filterJobs);
typeFilter.addEventListener("change",filterJobs);

function viewJob(id){
    localStorage.setItem("selectedJob", id);
    window.location.href = "job-details.html";
}
// Load jobs when page opens
loadJobs();