// // displayWeatherAndSolar.js

export const displayWeatherAndSolar = (weatherAndSolarObject, containerId) => {
    // Parse the Objects to get the data
    const weatherData = JSON.parse(WeatherDataObject);
    console.log(weatherData);
    const solarData = JSON.parse(SolarDataObject);
    console.log(solarData);

    // const data = weatherData.data;

//     // Append the table to the specified container
//     const dataList = document.getElementById(containerId);
//     dataList.innerHTML = ""; // Clear previous entries
//     dataList.appendChild(table);
};
