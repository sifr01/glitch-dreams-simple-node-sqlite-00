// client.js
// client-side js
// run by the browser each time your view template referencing it is loaded

import { displayTideTimesTable } from './displayTideTimesTable.js'; // Adjust the path if necessary
import { displayErrorMessage } from './displayErrorMessages.js'; // Import the error display function

console.log("client.js is running");

// define variables that reference elements on our page
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements["dream"];
const dataList = document.getElementById("data");             // This is where the data will be output to the DOM
// const clearButton = document.querySelector('#clear-data');

const errorMessage = document.getElementById("error-messages");
const apiOutput = document.getElementById("api-output");
const tideTimesButton = document.querySelector('#tide-times-button');
const weatherDataButton = document.querySelector('#weather-data-button');

// request the data from our app's sqlite database
fetch("/getData", {})
  .then(res => res.json())
  .then(response => {
    // Assuming response is an array and we want the last entry
    const lastEntry = response[response.length - 1].TideTimesObject;

    // Call the function to append the last entry data to the DOM
    displayTideTimesTable(lastEntry, 'dataList'); // Pass the container ID
  });

// const dreams = [];
// // listen for the form to be submitted and add a new dream when it is
// dreamsForm.onsubmit = event => {
//   // stop our form submission from refreshing the page
//   event.preventDefault();

//   const data = { dream: dreamInput.value };

//   fetch("/addDream", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => res.json())
//     .then(response => {
//       console.log(JSON.stringify(response));
//     });
//   // get dream value and add it to the list
//   dreams.push(dreamInput.value);
//   appendNewDream(dreamInput.value);

//   // reset form
//   dreamInput.value = "";
//   dreamInput.focus();
// };

// event listener for clearButton:
  // 1. hits server endpoint which triggers deletion of all entries from table and
  // 2. clears DOM of all API data
// clearButton.addEventListener('click', event => {
//   fetch("/clearDOM", {})        //initiates a GET request to the endpoint /clearDOM 
//     .then(res => res.json())    //promise handler that processes the response from the fetch request. res is the response object returned from the server. The res.json() method is called to read the response body and parse it as JSON. This method also returns a promise that resolves with the result of parsing the body text as JSON.
//     .then(response => {
//       apiOutput.innerHTML = "";
//       console.log("cleared DOM of all API data and deleted all entries from table");
//     });
// });

// Event listener for tideTimesButton
tideTimesButton.addEventListener('click', event => {
  console.log("tideTimesButton API button clicked");
  fetch("/getTideTimes", {})
    .then(response => {
      if (response.status === 429) {
        return response.json().then(data => {
          displayErrorMessage(data.message); // Display the error message in the DOM
        });
      }
      return response.json(); // Process the response if not an error
    })
    .then(data => {
      if (data) {
        console.log("The tide times data is: ", data);
        // Handle the tide times data here if needed
      }
    })
    .catch(error => {
      console.error("Error fetching tide times:", error);
      displayErrorMessage("An error occurred while fetching tide times."); // Display a generic error message
    });
});

// Event listener for weatherDataButton
weatherDataButton.addEventListener('click', event => {
  console.log("weatherDataButton API button clicked");
  fetch("/getWeatherData", {})
    .then(response => {
      if (response.status === 429) {
        return response.json().then(data => {
          displayErrorMessage(data.message); // Display the error message in the DOM
        });
      }
      return response.json(); // Process the response if not an error
    })
    .then(data => {
      if (data) {
        console.log("The Weather data is: ", data);
        // Handle the weather data here if needed
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      displayErrorMessage("An error occurred while fetching weather data."); // Display a generic error message
    });
});



