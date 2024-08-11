// server.js
// where your node app starts

// init project
const { getTideTimes } = require('./server/getTideTimes.js');
const { currentUnixTimestamp } = require('./server/currentUnixTimestamp.js');
const { insertAPIdata } = require('./server/insertAPIdata.js');
const { check7days } = require('./server/check7days.js');

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

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
// Check if the database file exists and handle table creation
db.serialize(() => {
  if (!exists) {
    // If the database file does not exist, create it and the table
    db.run(
      "CREATE TABLE BeachTable (id INTEGER PRIMARY KEY AUTOINCREMENT, weatherObject TEXT, time INTEGER)",
      (err) => {
        if (err) {
          console.error("Error creating table BeachTable:", err.message);
        } else {
          console.log("New table BeachTable created!");

          // Insert dummy data into database for testing purposes
          db.run(
            'INSERT INTO BeachTable (weatherObject, time) VALUES (?, ?), (?, ?), (?, ?)',
            [
              "{This is test entry}", 0,
              "{This is test entry}", 1,
              "{This is test entry}", 2
            ],
            (err) => {
              if (err) {
                console.error("Error inserting dummy data:", err.message);
              } else {
                console.log("Dummy data inserted successfully!");
              }
            }
          );
        }
      }
    );
  } else {
    // If the database file exists, check for the table
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='BeachTable'", (err, row) => {
      if (err) {
        console.error("Error checking for table:", err.message);
      } else if (!row) {
        // Table does not exist, create it
        db.run(
          "CREATE TABLE BeachTable (id INTEGER PRIMARY KEY AUTOINCREMENT, weatherObject TEXT, time INTEGER)",
          (err) => {
            if (err) {
              console.error("Error creating table BeachTable:", err.message);
            } else {
              console.log("New table BeachTable created!");
            }
          }
        );
      } else {
        console.log('Table "BeachTable" already exists.');
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the weatherObjects in the database
app.get("/getData", (request, response) => {
  db.all("SELECT * from BeachTable", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a weatherObject to the database
app.post("/addDream", (request, response) => {
  console.log(`add to weatherObject ${request.body.weatherObject}`);

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    const cleansedDream = cleanseString(request.body.weatherObject);
    db.run(`INSERT INTO BeachTable (weatherObject, time) VALUES (?, ?)`, [cleansedDream, currentUnixTimestamp()], error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    });
  }
});

// Endpoint to insert API data into the SQLite database
app.get('/getTideTimes', async (req, res) => {
  console.log('GET request reached the internal server side endpoint');

  try {
    // 1. Check if more than 7 days have passed since the last tide times table entry
    console.log("Checking if more than 7 days have passed since the last tide times table entry")
    const canCallAPI = await check7days(db); // Pass the database connection to check7days
    console.log("using check7days(), has it been more than 7 days since last tide times API call?: " + await check7days(db));
    if (!canCallAPI) {
        return res.status(429).json({ message: "API call not allowed. Last entry was less than 7 days ago." });
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
    const result = await insertAPIdata(apiData); // Await the insertion result
    console.log("Data inserted successfully:", result);

    // 5. Send a response back to the client
    res.status(201).json({ message: "Data inserted successfully", result });
  } catch (error) {
    console.error("Error in processing:", error);
    // 6. Handle the error appropriately
    res.status(500).json({ error: error.message });
  }

});

// endpoint to clear weatherObject from the database
app.get("/clearDOM", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.each(
      "SELECT * from BeachTable",
      (err, row) => {
        console.log("row", row);
        db.run(`DELETE FROM BeachTable WHERE ID=?`, row.id, error => {
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