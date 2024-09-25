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
    const headers = ["Time", "Height m", "Type"];

    headers.forEach((headerText, index) => {
        const cell = headerRow.insertCell(index);
        cell.textContent = headerText;
        cell.classList.add('sticky-header'); // Add a class for styling
    });

    const tbody = table.createTBody();

    // Variable to keep track of the last displayed date
    let lastDisplayedDate = "";

    // Loop through the tide times data and create rows
    data.forEach(entry => {
        // Format the time using formatDate function
        const { formattedDate, isToday } = formatDate(entry.time);
        const entryDate = new Date(entry.time); // Create a Date object for formatting
        const dayOfWeek = formattedDate.split(", ")[0]; // Extract the day of the week

        // Format the date as DD/MM/YYYY
        const formattedDateString = `${String(entryDate.getDate()).padStart(2, '0')}/${String(entryDate.getMonth() + 1).padStart(2, '0')}/${entryDate.getFullYear()}`;

        // Check if the date has changed
        if (formattedDateString !== lastDisplayedDate) {
            // Update the last displayed date
            lastDisplayedDate = formattedDateString;

            // Create a new row for the date header
            const dateRow = tbody.insertRow();
            const dateCell = dateRow.insertCell(0);
            dateCell.colSpan = 3; // Span across all columns
            dateCell.textContent = `${dayOfWeek}, ${formattedDateString}`; // Day and Date
            dateCell.style.fontWeight = "bold"; // Make the date bold
        }

        // Create a new row for tide data
        const row = tbody.insertRow();
        
        // Use the helper function to create cells for tide data
        createCell(row, formattedDate.split(", ")[1], isToday); // Time cell (only time)
        createCell(row, entry.height.toFixed(2), isToday); // Height (metres)
        createCell(row, entry.type, isToday); // Type
    });

    // Define the footer data
    const footers = [
        "Data source:", "Viana", "SG HC"
    ];

    // Create a new footer row
    const footerRow = tbody.insertRow();
    footers.forEach((footerText, index) => {
        const cell = footerRow.insertCell(index);
        cell.textContent = footerText;
        cell.style.fontWeight = "bold"; // Optional: Make footer text bold
    });

    // Append the table to the specified container
    container.appendChild(table);
};

// Helper function to create a cell and apply styles if it's today
const createCell = (row, content, isToday) => {
    const cell = row.insertCell();
    cell.textContent = content;
    if (isToday) {
        cell.style.backgroundColor = "lightblue"; // Change background color to light blue
    }
    return cell;
};
