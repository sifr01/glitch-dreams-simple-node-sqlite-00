// insertAPIdata.js

// Function to insert API data into SQLite database
async function insertAPIdata(db, tableName, APIdata) {
    // Prepare the SQL statement for inserting the tideTimesObject and timestamp
    const sql = `INSERT INTO ${tableName} (${tableName}Object, time) VALUES (?, ?)`;

    // Get the current Unix timestamp
    const timestamp = Date.now();

    return new Promise((resolve, reject) => {
        // Insert API data object and timestamp into the database
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