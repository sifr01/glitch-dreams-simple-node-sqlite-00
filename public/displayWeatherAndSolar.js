// displayWeatherAndSolar.js

import { formatDate } from './formatDate.js';

export const displayWeatherAndSolar = (weatherAndSolarObject, containerId) => {
    const weatherData = weatherAndSolarObject.weatherData; // Access weather data
    const solarData = weatherAndSolarObject.solarData; // Access solar data

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous entries

    const h1 = document.createElement("h1");
    h1.innerText = "Weather and Solar Data";
    container.appendChild(h1);

    const table = document.createElement('table');
    table.border = "1"; // Optional: Add border for better visibility

    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = [
        "Time", "Wind Speed (noaa)", "Gust (dwd)", "Gust (noaa)", "Gust (sg)", 
        "Pressure (dwd)", "Pressure (noaa)", "Pressure (sg)", 
        "Water Temp (meto)", "Water Temp (noaa)", "Wave Height (dwd)", "Wave Height (noaa)",
        "UV Index (noaa)" // Only include NOAA UV Index
    ];

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

    // Loop through the weather data and create rows
    weatherData.hours.forEach((hour, index) => {
        const row = tbody.insertRow();
        
        // Format the time using formatDate function
        const { formattedDate, isToday } = formatDate(hour.time);

        // Use the helper function to create cells for weather data
        createCell(row, formattedDate, isToday); // Time cell
        createCell(row, hour.windSpeed.noaa, isToday); // Wind Speed (noaa)
        createCell(row, hour.gust.dwd, isToday); // Gust (dwd)
        createCell(row, hour.gust.noaa, isToday); // Gust (noaa)
        createCell(row, hour.gust.sg, isToday); // Gust (sg)
        createCell(row, hour.pressure.dwd, isToday); // Pressure (dwd)
        createCell(row, hour.pressure.noaa, isToday); // Pressure (noaa)
        createCell(row, hour.pressure.sg, isToday); // Pressure (sg)
        createCell(row, hour.waterTemperature.meto, isToday); // Water Temp (meto)
        createCell(row, hour.waterTemperature.noaa, isToday); // Water Temp (noaa)
        createCell(row, hour.waveHeight.dwd, isToday); // Wave Height (dwd)
        createCell(row, hour.waveHeight.noaa, isToday); // Wave Height (noaa)

        // Add UV index cell for NOAA
        if (solarData && solarData.hours && solarData.hours[index]) {
            const solarHour = solarData.hours[index];
            createCell(row, solarHour.uvIndex.noaa, isToday); // UV Index (noaa)
        } else {
            // If solar data is not available, add an empty cell
            createCell(row, "", isToday); // Empty cell for UV Index (noaa)
        }
    });

    // Append the table to the specified container
    container.appendChild(table);
};
