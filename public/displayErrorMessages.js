// displayErrorMessages.js
// Function to create and display error messages in the DOM
export function displayErrorMessage(message) {
    const errorMessageContainer = document.getElementById("error-messages");
    errorMessageContainer.innerHTML = ""; // Clear previous messages
  
    const errorMessageElement = document.createElement("div");
    errorMessageElement.className = "error-message"; // Add a class for styling
    errorMessageElement.textContent = message;
  
    errorMessageContainer.appendChild(errorMessageElement);
  }
  