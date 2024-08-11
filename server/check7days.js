// check7days.js
// API call rate limiting function

// init sqlite db
const dbFile = "./server/.data/sqlite.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// define function
const check7days = async (db) => {
    return new Promise((resolve, reject) => {
        // Query to get all entries from the database
        db.all("SELECT weatherObject FROM BeachTable ORDER BY time DESC", (err, rows) => {
            if (err) {
                console.error("Error fetching entries:", err);
                return reject(err);
            }
            if (!rows || rows.length === 0) {
                return resolve(true); // If there are no entries, we can proceed with the API call
            }

            // Get the last entry's weatherObject
            const lastEntry = rows[rows.length - 1].weatherObject; // Access the last entry's weatherObject
            const lastTimestamp = new Date(lastEntry.timestamp).getTime(); // Assuming lastEntry has a timestamp field
            const currentTime = Date.now(); // Current time in milliseconds
            const timeDifference = currentTime - lastTimestamp; // Difference in milliseconds
            const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert to days

            resolve(daysDifference > 7); // Return true if more than 7 days have passed
        });
    });
};

module.exports = { check7days };
