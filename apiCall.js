// apiCall.js

// imports and declaration for .env file (API key credentials)
require('dotenv').config();
const apiKey = process.env.API_KEY;

// Import the function from todayTomorrowTimestamps.js
// const { getTodayTomorrowTimestamps } = require('./todayTomorrowTimestamps.js');
const getTodayTomorrowTimestamps = require('./timeStampofThirtyDays.js');

// const url = "https://jsonplaceholder.typicode.com/todos/1";
// const url = "https://randomuser.me/api/";

//times for today and tomorrow
const timestamps = getTodayTomorrowTimestamps();
const startTimestamp = timestamps.startOfTodayUnixTimestamp;
const endTimestamp = timestamps.endOf30DaysFromNowUnixTimestamp;

// set GPS co-ordinates for station name "viana", portugal
const lat = "41.683"
const lng = "-8.833"
const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${startTimestamp}&end=${endTimestamp}`;

// Function to make an API call
async function apiCall() {
  console.log("apiCall() function called")
  try {
      const response = await fetch(
        url, {
        headers: {
            'Authorization': apiKey     // Replace with your actual API key
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

// Function to handle the API button click
async function handleApiButtonClick() {
  console.log("handleApiButtonClick() function called");
  //if (current previous timestamp was less than 1.2 hours ago):
      // return error(API data does not need refreshing - too many queries! try again in an hour);
      // break;
        // } else { execute function
  try {
    const apiDataObject = await apiCall();
    //   const username = data.results[0].login.username; // Get the username
    const apiDataString = JSON.stringify(apiDataObject);
    return apiDataString;
    } 
  catch (error) {
      console.error("Error in API call:", error);
  }
}

module.exports = { handleApiButtonClick };