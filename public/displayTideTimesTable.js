// displayTideTimesTable.js

import { formatDate } from './formatDate.js';

// Function to create and display a tide times table
export const displayTideTimesTable = (tideTimesObject, containerId) => {
    const data = tideTimesObject; // Parse the tideTimesObject to get the data

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous entries

    const h1 = document.createElement("h1");
    h1.innerText = "Tide Times";
    container.appendChild(h1);

    const table = document.createElement("table");
    table.border = "1"; // Optional: Add border to the table

    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ["Time", "Height (metres)", "Type"];

    headers.forEach((headerText, index) => {
        const cell = headerRow.insertCell(index);
        cell.textContent = headerText;
    });

    const tbody = table.createTBody();

    // Helper function to create a cell and apply styles if it's today
    const createCell = (row, content, isToday) => {
        const cell = row.insertCell();
        cell.textContent = content;
        if (isToday) {
            cell.style.backgroundColor = "lightblue"; // Change background color to light blue
        }
        return cell;
    };

    // Loop through the tide times data and create rows
    data.forEach(entry => {
        const row = tbody.insertRow();
        
        // Format the time using formatDate function
        const { formattedDate, isToday } = formatDate(entry.time);

        // Use the helper function to create cells for tide data
        createCell(row, formattedDate, isToday); // Time cell
        createCell(row, entry.height.toFixed(2), isToday); // Height (metres)
        createCell(row, entry.type, isToday); // Type
    });

    // Append the table to the specified container
    container.appendChild(table);
};
