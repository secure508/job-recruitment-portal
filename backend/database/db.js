console.log("db.js is running...");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create the path to the database file
const dbPath = path.join(__dirname, "../database/jobportal.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to SQLite Database.");
    }
});

// Export the database connection
module.exports = db;
