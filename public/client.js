// client.js
// client-side js
// run by the browser each time your view template referencing it is loaded

import { handleApiButtonClick } from './api.js';   // Import the apiCall function

console.log("client.js is running");

const dreams = [];

// define variables that reference elements on our page
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements["dream"];
const dataList = document.getElementById("dreams");
const clearButton = document.querySelector('#clear-dreams');

const apiOutput = document.getElementById("api-output");
const apiButton = document.querySelector('#api-button');


// request the data from our app's sqlite database
fetch("/getData", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      appendNewData(row.weatherObject);
    });
  });

// a helper function that creates a list item for a given weatherObject
const appendNewData = weatherObject => {
  const newListItem = document.createElement("li");
  newListItem.innerText = weatherObject;
  dataList.appendChild(newListItem);
};

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

// event listener for clearButton
clearButton.addEventListener('click', event => {
  fetch("/clearDreams", {})
    .then(res => res.json())
    .then(response => {
      console.log("cleared dreams");
    });
  dreamsList.innerHTML = "";
});

// event listener for apiButton
apiButton.addEventListener('click', event => {
  handleApiButtonClick(apiOutput); // Call the function from api.js
});
