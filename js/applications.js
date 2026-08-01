const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const applications =
JSON.parse(localStorage.getItem("applications")) || [];

const container =
document.getElementById("applicationsContainer");

const employerApplications =
applications.filter(app=>app.employerId===currentUser.id);

if(employerApplications.length===0){

container.innerHTML="<h2>No applications yet.</h2>";

}else{

employerApplications.forEach(app=>{

container.innerHTML+=`

<div class="job-card">

<h3>${app.jobTitle}</h3>

<p><strong>Applicant:</strong> ${app.applicantName}</p>

<p><strong>Email:</strong> ${app.email}</p>

<p><strong>Phone:</strong> ${app.phone}</p>

<p><strong>Address:</strong> ${app.address}</p>

<p><strong>CV:</strong> ${app.cv}</p>

<p><strong>Date:</strong> ${app.date}</p>

<p><strong>Cover Letter:</strong></p>

<p>${app.coverLetter}</p>

</div>

`;

});

}