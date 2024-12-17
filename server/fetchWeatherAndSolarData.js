// fetchWeatherAndSolarData.js

// carries out 2 API calls using a fetch:
//   for data at specified GPS co-ordinates and 

// Import node-fetch to make it compatible with Glitch (you will also need to run: npm install node-fetch@2)
const fetch = require("node-fetch");

// Imports and declaration for .env file (API key credentials)
require('dotenv').config();
const apiKey = process.env.API_KEY;

// Set GPS coordinates for station name "viana", Portugal
const lat = "41.683";
const lng = "-8.833";
const paramsWeather = 'waveHeight,windSpeed,gust,windDirection,waterTemperature,pressure';
const paramsSolar = 'uvIndex';

// Define the URLs for the two API calls
const urlWeather = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${paramsWeather}`;
const urlSolar = `https://api.stormglass.io/v2/solar/point?lat=${lat}&lng=${lng}&params=${paramsSolar}`;

// Function to make API calls
const fetchWeatherAndSolarData = async () => {
  console.log("getWeatherData() function called");
  try {
    // Make both fetch requests concurrently
    const [responseWeather, responseSolar] = await Promise.all([
      fetch(urlWeather, {
        headers: {
          'Authorization': apiKey
        }
      }),
      fetch(urlSolar, {
        headers: {
          'Authorization': apiKey
        }
      })
    ]);

    // Check if both responses are OK
    if (!responseWeather.ok) {
      throw new Error(`HTTP error! status: ${responseWeather.status}`);
    }
    if (!responseSolar.ok) {
      throw new Error(`HTTP error! status: ${responseSolar.status}`);
    }

    // Parse the JSON data from both responses
    const weatherData = await responseWeather.json();
    const solarData = await responseSolar.json();

    // Return the combined data in an object
    return {
      weatherData: weatherData,
      solarData: solarData
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

module.exports = { fetchWeatherAndSolarData };