// api.js

// const url = "https://jsonplaceholder.typicode.com/todos/1";
const url = "https://randomuser.me/api/";

// // Function to make an API call
export async function apiCall() {
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
    // console.log("api call made to endpoint: " + url);
  }
  
