// api.js

// const url = "https://jsonplaceholder.typicode.com/todos/1";
const url = "https://randomuser.me/api/";

// Function to make an API call
async function apiCall() {
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


// Function to insert API data into sqlite database
async function insertAPIdata(APIdata) {
  try {
      const response = await fetch('/addAPIdata', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ APIdata }),
      });

      if (!response.ok) {
          throw new Error(`Error inserting user data: ${response.status}`);
      }

      // const result = await response.json();
      // console.log(result);
      console.log("User inserted:", APIdata);
  } catch (error) {
      console.error("Error inserting user data:", error);
  }
}


// Function to handle the API button click
export async function handleApiButtonClick(apiOutput) {
  console.log("API button clicked");
  //if (current previous timestamp was less than 1.2 hours ago):
      // return error(API data does not need refreshing - too many queries! try again in an hour);
      // break;
        // } else { execute function
  try {
      const apiDataObject = await apiCall();
    //   const username = data.results[0].login.username; // Get the username
    const apiDataString = JSON.stringify(apiDataObject)
      apiOutput.innerHTML = apiDataString; // Update the DOM with the API call data

      // Insert the weather data object into the SQLite database
      await insertAPIdata(apiDataString);
  } catch (error) {
      console.error("Error in API call:", error);
  }
}

