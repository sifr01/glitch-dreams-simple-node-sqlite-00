// api.js

// const url = "https://jsonplaceholder.typicode.com/todos/1";
const url = "https://randomuser.me/api/";

// // Function to make an API call
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

// Function to handle the API button click
export async function handleApiButtonClick(apiOutput) {
  console.log("API button clicked");
  try {
      const data = await apiCall();
      console.log("Data received:", data);
      apiOutput.innerHTML = data.results[0].login.username; // Update the DOM with the username
  } catch (error) {
      console.error("Error in API call:", error);
  }
}

