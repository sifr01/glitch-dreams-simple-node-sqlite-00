// todayTomorrowTimestamps.js

function getTodayTomorrowTimestamps() {
    const now = new Date();

    // Start of today (00:00:00)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTodayUnixTimestamp = Math.floor(startOfToday.getTime() / 1000);

    // End of tomorrow (23:59:59)
    const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59);
    const endOfTomorrowUnixTimestamp = Math.floor(endOfTomorrow.getTime() / 1000);

    return {
        startOfTodayUnixTimestamp,
        endOfTomorrowUnixTimestamp
    };
}

// Export the function if you want to use it in other files
module.exports = getTodayTomorrowTimestamps;