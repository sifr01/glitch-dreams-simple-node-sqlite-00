// tideTimesTable.js

// Function to create and display a tide times table
export const displayTideTimesTable = (weatherObject, containerId) => {
    // Parse the weatherObject to get the data
    const weatherData = JSON.parse(weatherObject);
    const data = weatherData.data;
  
    // Create a table element
    const table = document.createElement("table");
    table.border = "1"; // Optional: Add border to the table
  
    // Create table header
    const headerRow = document.createElement("tr");
    const headers = ["Time", "Height (metres)", "Type"];
    headers.forEach(headerText => {
      const header = document.createElement("th");
      header.innerText = headerText;
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
  
   
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' }; // Get the full name of the weekday
    const weekday = date.toLocaleDateString('en-US', options).slice(0, 3); // Shorten to first 3 letters
    const hours = String(date.getHours()).padStart(2, '0'); // Format hours
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Format minutes
    const day = String(date.getDate()).padStart(2, '0'); // Format day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Format month (0-indexed)
    const year = date.getFullYear(); // Get the full year

    return `${weekday}, ${hours}:${minutes}, ${day}-${month}-${year}`;
  };

  // Populate the table with the last entry data
  data.forEach(entry => {
    const row = document.createElement("tr");
    const heightCell = document.createElement("td");
    // Round height to 2 decimal places
    heightCell.innerText = entry.height.toFixed(2);
    const timeCell = document.createElement("td");
    // Format the time
    timeCell.innerText = formatDate(entry.time);
    const typeCell = document.createElement("td");
    typeCell.innerText = entry.type;

    row.appendChild(timeCell);
    row.appendChild(heightCell);
    row.appendChild(typeCell);
    table.appendChild(row);
  });
  
    // Append the table to the specified container
    const dataList = document.getElementById(containerId);
    dataList.innerHTML = ""; // Clear previous entries
    dataList.appendChild(table);
  };