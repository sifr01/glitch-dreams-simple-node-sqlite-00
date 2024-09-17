// client.js

import { displayTideTimesTable } from './displayTideTimesTable.js';
import { displayWeatherAndSolar } from './displayWeatherAndSolar.js';
import { displayErrorMessage } from './displayErrorMessages.js';
import { switchTab } from './switchTab.js';

console.log("client.js is running");

// Define variables that reference elements on our page
const errorMessage = document.getElementById("error-messages");

const tideTimesButton = document.querySelector('#tide-times-button');
const weatherDataButton = document.querySelector('#weather-data-button');

const tideTimesTable = document.getElementById("tide-times-table");
const weatherSolarOutput = document.getElementById("weather-solar-output");

// Function to show the selected tab and hide others
const showTab = (tabToShow) => {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab
    tabToShow.style.display = 'block';
}

// REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY
const tideTimesDBquery = document.querySelector('#tide-times-DB-query');
const weatherDBquery = document.querySelector('#weather-DB-query');

const tideTimesTab = document.getElementById('tide-times-DB-query');
const weatherTab = document.getElementById('weather-DB-query');

// Event listener for tide times database query (SELECT)
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
            console.log("Tide times data received:", data.data);
            displayTideTimesTable(data.data, 'tide-times-data'); // Display tide times data
            showTab(tideTimesTable); // Ensure the tide times table is shown
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Event listener for weather data database query (SELECT)
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
            showTab(weatherSolarOutput); // Ensure the weather data output is shown
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY REFRESH FUNCTIONALITY

// Event listener for tideTimesButton
tideTimesButton.addEventListener('click', event => {
    console.log("tideTimesButton API button clicked");
    showTab(tideTimesTable); // Show tide times table
    fetch("/getTideTimes", {})
        .then(response => {
            if (response.status === 429) {
                return response.json().then(data => {
                    displayErrorMessage(data.message);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("The getTideTimes endpoint response message is: ", data);
                // Handle the tide times data here if needed
            }
        })
        .catch(error => {
            console.error("Error fetching tide times:", error);
            displayErrorMessage("An error occurred while fetching tide times.");
        });
});

// Event listener for weatherDataButton
weatherDataButton.addEventListener('click', event => {
    console.log("weatherDataButton API button clicked");
    showTab(weatherSolarOutput); // Show weather data output
    fetch("/getWeatherAndSolarData", {})
        .then(response => {
            if (response.status === 429) {
                return response.json().then(data => {
                    displayErrorMessage(data.message);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("The getWeatherAndSolarData endpoint response message is: ", data);
                // Handle the weather data here if needed
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            displayErrorMessage("An error occurred while fetching weather data.");
        });
});