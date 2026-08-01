const express = require("express");

const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById,
    getJobsByEmployer,
    updateJob,
    deleteJob
} = require("../controllers/jobsController");

router.get("/test", (req, res) => {
    res.json({ message: "Jobs route is working!" });
});

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/details/:id", getJobById);
router.get("/employer-jobs/:employerId", getJobsByEmployer);
router.put("/update/:id", updateJob);
router.delete("/remove/:id", deleteJob);

module.exports = router;