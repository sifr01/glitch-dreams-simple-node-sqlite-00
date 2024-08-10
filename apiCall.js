// apiCall.js

require('dotenv').config();
const apiKey = process.env.API_KEY;

// const url = "https://jsonplaceholder.typicode.com/todos/1";
const url = "https://randomuser.me/api/";

// Function to make an API call
async function apiCall() {
  console.log("apiCall() function called")
  console.log(`Using API key: ${apiKey}`);
  try {
      const response = await fetch(url);
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



    } catch (error) {
      console.error("Error in API call:", error);
  }
}

module.exports = { handleApiButtonClick };