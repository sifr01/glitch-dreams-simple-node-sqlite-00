// displayErrorMessages.js
// Function to create and display error messages in the DOM
export function displayErrorMessages(message, destination) {
    const errorMessageContainer = document.getElementById(destination);
    errorMessageContainer.innerHTML = ""; // Clear previous messages
  
    const errorMessageElement = document.createElement("div");
    errorMessageElement.className = "error-message"; // Add a class for styling
    errorMessageElement.textContent = message;
  
    errorMessageContainer.appendChild(errorMessageElement);
  }
  