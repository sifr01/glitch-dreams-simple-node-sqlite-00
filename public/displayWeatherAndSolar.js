// displayWeatherAndSolar.js

export const displayWeatherAndSolar = (weatherAndSolarObject, containerId) => {
    // Assuming weatherAndSolarObject is already an object, no need to parse
    const weatherData = weatherAndSolarObject; // No need to parse if it's already an object

    // Get the container to append the table
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous entries

    // Create and append the h1 element
    const h1 = document.createElement("h1");
    h1.innerText = "Weather";
    container.appendChild(h1);

    // Create a table element
    const table = document.createElement('table');
    table.border = "1"; // Optional: Add border for better visibility

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ["Time", "Gust (dwd)", "Gust (noaa)", "Gust (sg)", "Pressure (dwd)", "Pressure (noaa)", "Pressure (sg)", "Water Temp (meto)", "Water Temp (noaa)", "Wave Height (dwd)", "Wave Height (noaa)", "Wind Speed (noaa)"];

    headers.forEach((headerText, index) => {
        const cell = headerRow.insertCell(index);
        cell.textContent = headerText;
    });

    // Create table body
    const tbody = table.createTBody();

    // Get today's date for comparison
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Loop through the weather data and create rows
    weatherData.hours.forEach(hour => {
        const row = tbody.insertRow();
        
        // Create a new Date object for the current hour
        const hourDate = new Date(hour.time);
        const hourString = hourDate.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

        // Check if the hour corresponds to today
        const isToday = hourString === todayString;

        // Insert cells and apply styles if it's today
        const timeCell = row.insertCell(0);
        timeCell.textContent = hour.time; // Time
        if (isToday) timeCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const gustDwdCell = row.insertCell(1);
        gustDwdCell.textContent = hour.gust.dwd; // Gust (dwd)
        if (isToday) gustDwdCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const gustNoaaCell = row.insertCell(2);
        gustNoaaCell.textContent = hour.gust.noaa; // Gust (noaa)
        if (isToday) gustNoaaCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const gustSgCell = row.insertCell(3);
        gustSgCell.textContent = hour.gust.sg; // Gust (sg)
        if (isToday) gustSgCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const pressureDwdCell = row.insertCell(4);
        pressureDwdCell.textContent = hour.pressure.dwd; // Pressure (dwd)
        if (isToday) pressureDwdCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const pressureNoaaCell = row.insertCell(5);
        pressureNoaaCell.textContent = hour.pressure.noaa; // Pressure (noaa)
        if (isToday) pressureNoaaCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const pressureSgCell = row.insertCell(6);
        pressureSgCell.textContent = hour.pressure.sg; // Pressure (sg)
        if (isToday) pressureSgCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const waterTempMetoCell = row.insertCell(7);
        waterTempMetoCell.textContent = hour.waterTemperature.meto; // Water Temp (meto)
        if (isToday) waterTempMetoCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const waterTempNoaaCell = row.insertCell(8);
        waterTempNoaaCell.textContent = hour.waterTemperature.noaa; // Water Temp (noaa)
        if (isToday) waterTempNoaaCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const waveHeightDwdCell = row.insertCell(9);
        waveHeightDwdCell.textContent = hour.waveHeight.dwd; // Wave Height (dwd)
        if (isToday) waveHeightDwdCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const waveHeightNoaaCell = row.insertCell(10);
        waveHeightNoaaCell.textContent = hour.waveHeight.noaa; // Wave Height (noaa)
        if (isToday) waveHeightNoaaCell.style.backgroundColor = "lightblue"; // Change background color to light blue

        const windSpeedNoaaCell = row.insertCell(11);
        windSpeedNoaaCell.textContent = hour.windSpeed.noaa; // Wind Speed (noaa)
        if (isToday) windSpeedNoaaCell.style.backgroundColor = "lightblue"; // Change background color to light blue
    });

    // Append the table to the specified container
    container.appendChild(table);
};
