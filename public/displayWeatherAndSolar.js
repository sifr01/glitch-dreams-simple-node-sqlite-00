import { formatDate } from './formatDate.js';

export const displayWeatherAndSolar = (weatherAndSolarObject, containerId) => {
    const weatherData = weatherAndSolarObject; // No need to parse if it's already an object

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous entries

    const h1 = document.createElement("h1");
    h1.innerText = "Weather";
    container.appendChild(h1);

    const table = document.createElement('table');
    table.border = "1"; // Optional: Add border for better visibility

    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ["Time", "Gust (dwd)", "Gust (noaa)", "Gust (sg)", "Pressure (dwd)", "Pressure (noaa)", "Pressure (sg)", "Water Temp (meto)", "Water Temp (noaa)", "Wave Height (dwd)", "Wave Height (noaa)", "Wind Speed (noaa)"];

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
    weatherData.hours.forEach(hour => {
        const row = tbody.insertRow();
        
        // Format the time using formatDate function
        const { formattedDate, isToday } = formatDate(hour.time);

        // Use the helper function to create cells
        createCell(row, formattedDate, isToday); // Time cell
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
        createCell(row, hour.windSpeed.noaa, isToday); // Wind Speed (noaa)
    });

    // Append the table to the specified container
    container.appendChild(table);
};
