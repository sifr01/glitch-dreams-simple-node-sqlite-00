// client.js
// client-side js
// run by the browser each time your view template referencing it is loaded

import { displayTideTimesTable } from './tideTimesTable.js'; // Adjust the path if necessary

console.log("client.js is running");

// define variables that reference elements on our page
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements["dream"];
const dataList = document.getElementById("data");             // This is where the data will be output to the DOM
const clearButton = document.querySelector('#clear-data');

const apiOutput = document.getElementById("api-output");
const apiButton = document.querySelector('#api-button');

// request the data from our app's sqlite database
fetch("/getData", {})
  .then(res => res.json())
  .then(response => {
    // Assuming response is an array and we want the last entry
    const lastEntry = response[response.length - 1].weatherObject;

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
clearButton.addEventListener('click', event => {
  fetch("/clearDOM", {})        //initiates a GET request to the endpoint /clearDOM 
    .then(res => res.json())    //promise handler that processes the response from the fetch request. res is the response object returned from the server. The res.json() method is called to read the response body and parse it as JSON. This method also returns a promise that resolves with the result of parsing the body text as JSON.
    .then(response => {
      apiOutput.innerHTML = "";
      console.log("cleared DOM of all API data and deleted all entries from table");
    });
});

// event listener for apiButton
apiButton.addEventListener('click', event => {
  console.log("API button clicked");
  fetch("/addAPIdata", {})    //initiates a GET request to the endpoint /addAPIdata 
  .then(response => {
    console.log("The API data is: " + response);
  });
});
