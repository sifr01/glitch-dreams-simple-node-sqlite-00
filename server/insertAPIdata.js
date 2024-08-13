// insertAPIdata.js

// init sqlite db
const dbFile = "./server/.data/sqlite.db";
// const fs = require("fs");
// const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// Function to insert API data into SQLite database
async function insertAPIdata(APIdata) {
    // Prepare the SQL statement for inserting the tideTimesObject and timestamp
    const sql = 'INSERT INTO TideTimes (tideTimesObject, time) VALUES (?, ?)';

    // Get the current Unix timestamp
    const timestamp = Date.now();

    return new Promise((resolve, reject) => {
        // Insert the cleansed tideTimesObject and timestamp into the database
        db.run(sql, [APIdata, timestamp], function(err) {
            if (err) {
                return reject({ error: err.message }); // Reject the promise with the error
            }
            // Resolve the promise with the ID of the newly inserted row and timestamp
            resolve({ id: this.lastID, timestamp });
        });
    });
}

module.exports = { insertAPIdata };