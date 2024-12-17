// server/fetchTideTimes.js

// calculates 30 days from now and 
// carries out the API call using a fetch:
//   for data at specified GPS co-ordinates and 
//   for 30 days of data

// Import node-fetch to make it compatible with Glitch (you will also need to run: npm install node-fetch@2 )
const fetch = require("node-fetch");

// imports and declaration for .env file (API key credentials)
require('dotenv').config();
const apiKey = process.env.API_KEY;

// Import the function from todayTomorrowTimestamps.js
const getTodayTomorrowTimestamps = require('./timeStampofThirtyDays.js');

//times for today and tomorrow
const timestamps = getTodayTomorrowTimestamps();
const startTimestamp = timestamps.startOfTodayUnixTimestamp;
const endTimestamp = timestamps.endOf30DaysFromNowUnixTimestamp;

// set GPS co-ordinates for station name "viana", portugal
const lat = "41.683"
const lng = "-8.833"
const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${startTimestamp}&end=${endTimestamp}`;

// Function to make an API call
async function fetchTideTimes() {
  console.log("fetchTideTimes() function called")
  try {
      const response = await fetch(
        url, {
        headers: {
            'Authorization': apiKey
          }
        });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error for further handling if needed
  }
}

module.exports = { fetchTideTimes };