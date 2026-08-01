const db = require("../database/db");

const normalizeJob = (job) => ({
    id: job.id,
    employerId: job.employerId,
    title: job.jobTitle,
    jobTitle: job.jobTitle,
    company: job.companyName,
    companyName: job.companyName,
    location: job.location,
    category: job.category,
    salary: job.salary,
    employmentType: job.employmentType,
    qualification: job.qualification,
    experience: job.experience,
    description: job.description,
    deadline: job.deadline,
    createdAt: job.createdAt
});

// Create a new job
const createJob = (req, res) => {
    const {
        employerId,
        jobTitle,
        companyName,
        location,
        category,
        salary,
        employmentType,
        qualification,
        experience,
        description,
        deadline
    } = req.body;

    if (!jobTitle || !companyName || !location) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    db.run(
        `INSERT INTO jobs (
            employerId,
            jobTitle,
            companyName,
            location,
            category,
            salary,
            employmentType,
            qualification,
            experience,
            description,
            deadline
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
            employerId,
            jobTitle,
            companyName,
            location,
            category,
            salary,
            employmentType,
            qualification,
            experience,
            description,
            deadline
        ],
        function(err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Job posted successfully.",
                jobId: this.lastID
            });
        }
    );
};

// Get all jobs
const getAllJobs = (req, res) => {
    db.all(
        "SELECT * FROM jobs ORDER BY createdAt DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                jobs: rows.map(normalizeJob)
            });
        }
    );
};

// Get a single job
const getJobById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM jobs WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        if (!row) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }

        res.json({ success: true, job: normalizeJob(row) });
    });
};

// Get jobs for one employer
const getJobsByEmployer = (req, res) => {
    const { employerId } = req.params;

    db.all(
        "SELECT * FROM jobs WHERE employerId = ? ORDER BY createdAt DESC",
        [employerId],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            res.json({ success: true, jobs: rows.map(normalizeJob) });
        }
    );
};

// Update a job
const updateJob = (req, res) => {
    const { id } = req.params;
    const {
        jobTitle,
        companyName,
        location,
        category,
        salary,
        employmentType,
        qualification,
        experience,
        description,
        deadline
    } = req.body;

    db.run(
        `UPDATE jobs SET
            jobTitle = ?,
            companyName = ?,
            location = ?,
            category = ?,
            salary = ?,
            employmentType = ?,
            qualification = ?,
            experience = ?,
            description = ?,
            deadline = ?
        WHERE id = ?`,
        [jobTitle, companyName, location, category, salary, employmentType, qualification, experience, description, deadline, id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            res.json({ success: true, message: "Job updated successfully." });
        }
    );
};

// Delete a job
const deleteJob = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM jobs WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        res.json({ success: true, message: "Job deleted successfully." });
    });
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    getJobsByEmployer,
    updateJob,
    deleteJob
};