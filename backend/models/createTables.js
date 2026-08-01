console.log("createTables.js is running...");
const db = require("../database/db");

// ==========================
// Employers Table
// ==========================
db.run(`
CREATE TABLE IF NOT EXISTS employers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    description TEXT,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.log("❌ Error creating Employers table:", err.message);
    } else {
        console.log("✅ Employers table created successfully.");
    }
});

// Jobs Table
const createJobsTable = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employerId INTEGER,
        jobTitle TEXT NOT NULL,
        companyName TEXT NOT NULL,
        location TEXT NOT NULL,
        category TEXT,
        salary TEXT,
        employmentType TEXT,
        qualification TEXT,
        experience TEXT,
        description TEXT,
        deadline TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(employerId) REFERENCES employers(id)
    )
    `, (err) => {
        if (err) {
            console.log("❌ Jobs table error:", err.message);
            return;
        }

        console.log("✅ Jobs table ready.");
    });

    db.run(`ALTER TABLE jobs ADD COLUMN qualification TEXT`, (err) => {
        if (err && !err.message.includes("duplicate column name")) {
            console.log("⚠️ Could not ensure qualification column:", err.message);
        }
    });

    db.run(`ALTER TABLE jobs ADD COLUMN deadline TEXT`, (err) => {
        if (err && !err.message.includes("duplicate column name")) {
            console.log("⚠️ Could not ensure deadline column:", err.message);
        }
    });
};

createJobsTable();