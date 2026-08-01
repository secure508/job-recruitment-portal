console.log("THIS IS THE SERVER.JS I'M RUNNING");

const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./database/db");

require("./models/createTables");

const employerRoutes = require("./routes/employerRoutes");
const jobsRoutes = require("./routes/jobsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobsRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../")));

// Open index.html when visiting the site
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// Keep API root as JSON and let frontend routes fall back to index.html
app.get("/api", (req, res) => {
    res.json({ success: true, message: "Welcome to the Job Recruitment Portal API" });
});

app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});