// Create Local Storage Keys

if (!localStorage.getItem("jobSeekers")) {
    localStorage.setItem("jobSeekers", JSON.stringify([]));
}

if (!localStorage.getItem("employers")) {
    localStorage.setItem("employers", JSON.stringify([]));
}

if (!localStorage.getItem("jobs")) {
    localStorage.setItem("jobs", JSON.stringify([]));
}

if (!localStorage.getItem("applications")) {
    localStorage.setItem("applications", JSON.stringify([]));
}