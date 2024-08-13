// getWeatherData.js

// Import node-fetch to make it compatible with Glitch (you will also need to run: npm install node-fetch@2 )
const fetch = require("node-fetch");

// imports and declaration for .env file (API key credentials)
require('dotenv').config();
const apiKey = process.env.API_KEY;

// set GPS co-ordinates for station name "viana", portugal
const lat = "41.683"
const lng = "-8.833"
const params = 'uvIndex,waveHeight,windSpeed,gust,windDirection,waterTemperature,pressure';
const url = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;

// Function to make an API call
async function getWeatherData() {
  console.log("getWeatherData() function called")
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

module.exports = { getWeatherData };