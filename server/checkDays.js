// checkDays.js
// API call rate limiting function

// define function
const checkDays = async (db, tableName, numberOfDays) => {
    return new Promise((resolve, reject) => {
        // Query to get the most recent timestamp from the table
        db.all(`SELECT MAX(time) AS timeStamp FROM ${tableName};`, (err, rows) => {
            if (err) {
                console.error("Error fetching entries:", err);
                return reject(err);
            }
            if (!rows || rows.length === 0) {
                return resolve({ canProceed: true, daysDifference: null }); // If there are no entries in the table, we can proceed with the API call
            }
            const timeDifference = Date.now() - rows[0].timeStamp; // Difference between current time and the most recent timeStamp in the table
            const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert difference from milliseconds to days

            resolve({ canProceed: daysDifference > numberOfDays, daysDifference }); // Return an object with both values: Return true if more than x number of days have passed & number of days passed
        });
    });
};

module.exports = { checkDays };