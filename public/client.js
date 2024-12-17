// public/client.js

import { displayTideTimesTable } from './displayTideTimesTable.js';
import { displayWeatherAndSolar } from './displayWeatherAndSolar.js';
import { displayErrorMessages } from './displayErrorMessages.js';
import { switchTab } from './switchTab.js';
import { showTable } from './showTable.js';

console.log("client.js is running");

// Define variables that reference elements on the page
const tideTimesButton = document.querySelector('#tide-times-button');
const weatherDataButton = document.querySelector('#weather-data-button');

const tideTimesTable = document.getElementById("tide-times-table");
const weatherSolarOutput = document.getElementById("weather-solar-output");

// REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY
const tideTimesDBquery = document.querySelector('#tide-times-DB-query');
const weatherDBquery = document.querySelector('#weather-DB-query');

const tideTimesTab = document.getElementById('tide-times-DB-query');
const weatherTab = document.getElementById('weather-DB-query');

// A1 Event listener for tide times database query (SELECT)
tideTimesDBquery.addEventListener('click', event => {
    console.log("tideTimesDBquery button clicked");
    switchTab(tideTimesTab);
    fetch("/tideTimesDBquery")
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("client.js: Tide times data received:", data.data);
            displayTideTimesTable(data.data, 'tide-times-data'); // Display tide times data
            showTable(tideTimesTable); // Ensure the tide times table is shown
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// A2 Event listener for weather data database query (SELECT)
weatherDBquery.addEventListener('click', event => {
    console.log("weather-data-DB-query button clicked");
    switchTab(weatherTab);

    fetch("/weatherAndSolarDBquery")
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather data received:", data);
            displayWeatherAndSolar(data, 'weather-data'); // Display weather data
            showTable(weatherSolarOutput); // Ensure the weather data output is shown
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY

// B1 Event listener for tideTimesButton
tideTimesButton.addEventListener('click', async event => {
    console.log("tideTimesButton API button clicked");

    try {
        // Step 1: Make the API call and insert data into DB
        displayErrorMessages("API call is in progress...", "status-messages")
        console.log("API fetch attempt made");

        const apiResponse = await fetch("/fetchTideTimes"); //this endpoint does both
        if (!apiResponse.ok) {
            throw new Error(`API call failed: ${apiResponse.statusText}`);
        }
        const APIdata = await apiResponse.json();
        console.log("API data received:", APIdata);

        // // Step 2: Insert data into the database
        // needs an update progress HERE ---------
        // const db = /* Get your SQLite database connection here */;
        // const insertResult = await insertAPIdata(db, 'TideTimes', APIdata); //server/insertAPIdata.js is not allowed anyway!
        // console.log("Data inserted into the database successfully:", insertResult);

        // Step 3: Perform a database query
        displayErrorMessages("sqlite3 DB query is in progress...", "status-messages")
        const queryResponse = await fetch("/tideTimesDBquery");
        if (!queryResponse.ok) {
            throw new Error(`Database query failed: ${queryResponse.statusText}`);
        }
        const queryData = await queryResponse.json();
        console.log("Data received from database query:", queryData);

        // Step 4: Update the DOM
        // update progress
        displayErrorMessages("updating your table...", "status-messages")
        displayTideTimesTable(queryData.data, 'tide-times-data'); // Assuming queryData.data is the array of tide times
        console.log("DOM updated with new tide times data.");

    } catch (error) {
        console.error("Error during the process:", error);
        displayErrorMessages("An error occurred while processing tide times.", "error-messages");
    }
});

// B2 Event listener for weatherDataButton
weatherDataButton.addEventListener('click', event => {
    console.log("weatherDataButton API button clicked");
    showTable(weatherSolarOutput); // Show weather data output
    fetch("/fetchWeatherAndSolarData", {})
        .then(response => {
            if (response.status === 429) {
                return response.json().then(data => {
                    displayErrorMessages(data.message, "error-messages");
                });
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("The fetchWeatherAndSolarData endpoint response message is: ", data);
                // Handle the weather data here if needed
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            displayErrorMessages("An error occurred while fetching weather data.", "error-messages");
        });
});