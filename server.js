// server.js
// where your node app starts

// init project
const { getTideTimes } = require('./server/getTideTimes.js');
const { getWeatherData } = require('./server/getWeatherData.js');
const { insertAPIdata } = require('./server/insertAPIdata.js');
const { checkDays } = require('./server/checkDays.js');
const { insertDummyData } = require('./server/insertDummyData.js');
const { createTable } = require('./server/createTable.js');
const { checkTableExists } = require('./server/checkTableExists.js');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));    // http://expressjs.com/en/starter/static-files.html

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Ensure the .data directory exists
const dataDir = path.join(__dirname, './server/.data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`Created directory: ${dataDir}`);
}

// init sqlite db
const dbFile = "./server/.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./server/.data/sqlite.db does not exist, create it, otherwise print records to console
// Check if the database file exists and handle table creation
db.serialize(() => {

  const initializeDatabase = async (tableName) => {
    const exists = await checkTableExists(db, tableName);
    if (!exists) {
      await createTable(db, tableName);
      await insertDummyData(db, tableName, [`{"data":[{"height":0,"time":"0000-01-01T00:00:00+00:00","type":"low"}]}`, 1672578061000]);
    } else {
      console.log(`Table ${tableName} already exists.`);
    }
  };
  
  initializeDatabase("TideTimes").catch(err => console.error("Initialization error:", err));
  initializeDatabase("WeatherData").catch(err => console.error("Initialization error:", err));
  initializeDatabase("SolarData").catch(err => console.error("Initialization error:", err));
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// define getData endpoint
app.get("/getData", (request, response) => {
  console.log("getData internal server endpoint received get request");
  db.all("SELECT TideTimesObject FROM TideTimes WHERE time = (SELECT MAX(time) FROM TideTimes);", 
    (err, rows) => { // Change 'string' to 'rows' to reflect that it's an array of objects
      if (err) {
        console.error("Database error:", err);
        return response.status(500).json({ error: "Database error" });
      }
      
      // Check if rows is not empty
      if (rows.length === 0) {
        return response.status(404).json({ error: "No data found" });
      }

      // Assuming you want the last entry
      const tideTimesObjectString = rows[0].TideTimesObject; // Access the first row's TideTimesObject
      console.log(`TideTimesObject string: ${tideTimesObjectString}`);
      

      try {
        const tideTimesObject = JSON.parse(tideTimesObjectString); // Parse the JSON string
        console.log(`tideTimesObject: ${tideTimesObject}`);
        response.json(tideTimesObject); // Send the parsed JSON
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        response.status(500).json({ error: "Invalid JSON format" });
      }
    });
});


// // endpoint to add a tideTimesObject to the database
// app.post("/addDream", (request, response) => {
//   console.log(`add to tideTimesObject ${request.body.tideTimesObject}`);

//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects
//   // so they can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     const cleansedDream = cleanseString(request.body.tideTimesObject);
//     db.run(`INSERT INTO TideTimes (tideTimesObject, time) VALUES (?, ?)`, [cleansedDream, Date.now()], error => {
//       if (error) {
//         response.send({ message: "error!" });
//       } else {
//         response.send({ message: "success" });
//       }
//     });
//   }
// });



// Endpoint for getTideTimes and insertion of API data into the SQLite database
app.get('/getTideTimes', async (req, res) => {
  console.log('GET request reached the internal server side endpoint: getTideTimes');

  try {
    // 1. Check if more than x number of days have passed since the last tide times table entry
    const numberOfDays = 1;   // Specify number of days in rate limiting function
    console.log(`Checking if more than ${numberOfDays} number of day(s) have passed since the last tide times table entry`)
    const canCallAPI = await checkDays(db, "TideTimes", numberOfDays); // Pass the database connection to checkDays() along with number of days to check
    console.log(
      `It has been ${canCallAPI.daysDifference} days since last tide times API call. 
      Consequently, will the API call proceed?: ${canCallAPI.canProceed}`);
    if (!canCallAPI.canProceed) {
      return res.status(429).json({ message: `API call not allowed. Last entry was less than ${numberOfDays} day(s) ago.` });
    }

    // 2. Make the API call to get tide times (getTideTimes.js)
    const tideTimesData = await getTideTimes(); // Await the result of the API call
    const apiData = JSON.stringify(tideTimesData)
    console.log("getTideTimes() returns: " + apiData); // Log the resolved value

    // 3. Cleanse the data (cleanseString())
    // const cleansedAPIdata = cleanseString(req.body.APIdata);
    // const apiData = cleanseString(req.body.APIdata);

    // const { username } = req.body; // Assuming you're also inserting the username

    // 4. Insert the APIdata into the database (insertAPIcallData.js)
    const result = await insertAPIdata(db, "TideTimes", apiData); // Await the insertion result
    console.log("API data inserted successfully:", result);

    // 5. Send a response back to the client
    res.status(201).json({ message: "Data inserted successfully", result });
  } catch (error) {
    console.error("Error in processing:", error);
    // 6. Handle the error appropriately
    res.status(500).json({ error: error.message });
  }

});


// Endpoint for getWeatherData and insertion of API data into the SQLite database
app.get('/getWeatherData', async (req, res) => {
  console.log('GET request reached the internal server side endpoint: getWeatherData');

  try {
    // 1. Check if more than x number of days have passed since the last weather data table entry
    const numberOfDays = 1;   // Specify number of days in rate limiting function
    console.log(`Checking if more than ${numberOfDays} number of day(s) have passed since the weather data table entry`)
    const canCallAPI = await checkDays(db, "WeatherData", numberOfDays); // Pass the database connection to checkDays() along with number of days to check
    console.log(
      `It has been ${canCallAPI.daysDifference} days since last weather data API call. 
      Consequently, will the API call proceed?: ${canCallAPI.canProceed}`);
    if (!canCallAPI.canProceed) {
      return res.status(429).json({ message: `API call not allowed. Last entry was less than ${numberOfDays} day(s) ago.` });
    }

    // 2. Make the API call to get weather data (getWeatherData.js)
    const getResponse = await getWeatherData(); // Await the result of the API call
    const theWeatherData = JSON.stringify(getResponse.weatherData);
    const theSolarData = JSON.stringify(getResponse.solarData);
    
    console.log("weather data returns: " + theWeatherData); // Log the resolved value
    console.log("solar data returns: " + theSolarData); // Log the resolved value

    // 3. Cleanse the data (cleanseString())
    // const cleansedAPIdata = cleanseString(req.body.APIdata);
    // const apiData = cleanseString(req.body.APIdata);

    // const { username } = req.body; // Assuming you're also inserting the username

    // 4.1 Insert the weather APIdata into the database (insertAPIcallData.js)
    const weatherDataInsertionResult = await insertAPIdata(db, "WeatherData", theWeatherData); // Await the insertion result
    console.log("weather API data inserted successfully:", weatherDataInsertionResult);
    // 4.2 Insert the weather APIdata into the database (insertAPIcallData.js)
    const solarDataInsertionResult = await insertAPIdata(db, "SolarData", theSolarData); // Await the insertion result
    console.log("weather API data inserted successfully:", solarDataInsertionResult);

    // 5. Send a response back to the client
    res.status(201).json({ message: "Data inserted successfully", weatherDataInsertionResult, solarDataInsertionResult });
  } catch (error) {
    console.error("Error in processing:", error);
    // 6. Handle the error appropriately
    res.status(500).json({ error: error.message });
  }

});





// endpoint to clear tideTimesObject from the database
app.get("/clearDOM", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.each(
      "SELECT * from TideTimes",
      (err, row) => {
        console.log("row", row);
        db.run(`DELETE FROM TideTimes WHERE ID=?`, row.id, error => {
          if (row) {
            console.log(`deleted row ${row.id}`);
          }
        });
      },
      err => {
        if (err) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// Cleanse the API call data - ADD THIS LATER!
// helper function that prevents html/css/script malice
// const cleanseString = function(string) {
//   return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// };

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});