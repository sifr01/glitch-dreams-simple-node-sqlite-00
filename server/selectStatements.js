// server/selectStatements.js

const selectLatestTideTimes = (db) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT TideTimesObject FROM TideTimes WHERE time = (SELECT MAX(time) FROM TideTimes);", (err, rows) => {
        if (err) {
          return reject(err);
        }
        if (rows.length === 0) {
          return resolve(null);
        }
        resolve(rows[0].TideTimesObject);
      });
    });
  };
  
  const selectLatestWeatherAndSolarData = (db) => {
    return new Promise((resolve, reject) => {
      const weatherQuery = "SELECT WeatherDataObject FROM WeatherData WHERE time = (SELECT MAX(time) FROM WeatherData);";
      const solarQuery = "SELECT SolarDataObject FROM SolarData WHERE time = (SELECT MAX(time) FROM SolarData);";
  
      db.all(weatherQuery, (err, weatherRows) => {
        if (err) {
          return reject(err);
        }
        if (weatherRows.length === 0) {
          return resolve({ weatherData: null, solarData: null });
        }
        const weatherDataObjectString = weatherRows[0].WeatherDataObject;
  
        db.all(solarQuery, (err, solarRows) => {
          if (err) {
            return reject(err);
          }
          if (solarRows.length === 0) {
            return resolve({ weatherData: JSON.parse(weatherDataObjectString), solarData: null });
          }
          const solarDataObjectString = solarRows[0].SolarDataObject;
          resolve({
            weatherData: JSON.parse(weatherDataObjectString),
            solarData: JSON.parse(solarDataObjectString)
          });
        });
      });
    });
  };
  
  module.exports = {
    selectLatestTideTimes,
    selectLatestWeatherAndSolarData
  };
  