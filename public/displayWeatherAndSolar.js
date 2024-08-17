// displayWeatherAndSolar.js

export const displayWeatherAndSolar = (weatherAndSolarObject, containerId) => {
    // Assuming weatherAndSolarObject is already an object, no need to parse
    const weatherData = weatherAndSolarObject; // No need to parse if it's already an object
    // console.log(weatherData);

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

    // Loop through the weather data and create rows
    weatherData.hours.forEach(hour => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = hour.time; // Time
        row.insertCell(1).textContent = hour.gust.dwd; // Gust (dwd)
        row.insertCell(2).textContent = hour.gust.noaa; // Gust (noaa)
        row.insertCell(3).textContent = hour.gust.sg; // Gust (sg)
        row.insertCell(4).textContent = hour.pressure.dwd; // Pressure (dwd)
        row.insertCell(5).textContent = hour.pressure.noaa; // Pressure (noaa)
        row.insertCell(6).textContent = hour.pressure.sg; // Pressure (sg)
        row.insertCell(7).textContent = hour.waterTemperature.meto; // Water Temp (meto)
        row.insertCell(8).textContent = hour.waterTemperature.noaa; // Water Temp (noaa)
        row.insertCell(9).textContent = hour.waveHeight.dwd; // Wave Height (dwd)
        row.insertCell(10).textContent = hour.waveHeight.noaa; // Wave Height (noaa)
        row.insertCell(11).textContent = hour.windSpeed.noaa; // Wind Speed (noaa)
    });

    // Append the table to the specified container
    container.appendChild(table);
};