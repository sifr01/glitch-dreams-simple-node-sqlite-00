// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// Function to get the current Unix timestamp
const currentUnixTimestamp = () => {
  return Math.floor(Date.now())};
console.log("app started at: " + currentUnixTimestamp())

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, dream TEXT, time INTEGER)"
    );
    console.log("New table Dreams created!");

    

    // Insert default dreams with the current timestamp
    db.serialize(() => {
      db.run(
        'INSERT INTO Dreams (dream, time) VALUES (?, ?), (?, ?), (?, ?)',
        ["Find and count some sheep", currentUnixTimestamp(), 
         "Climb a really tall mountain", currentUnixTimestamp(), 
         "Wash the dishes", currentUnixTimestamp()]
      );
    });
  } else {
    console.log('Database "Dreams" ready to go!');
    db.each("SELECT * from Dreams", (err, row) => {
      if (row) {
        console.log(`record: ${row.dream}, added at: ${row.time}`);
      }
    });
  }
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the dreams in the database
app.get("/getDreams", (request, response) => {
  db.all("SELECT * from Dreams", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a dream to the database
app.post("/addDream", (request, response) => {
  console.log(`add to dreams ${request.body.dream}`);

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    const cleansedDream = cleanseString(request.body.dream);
    db.run(`INSERT INTO Dreams (dream, time) VALUES (?, ?)`, [cleansedDream, currentUnixTimestamp()], error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    });    
  }
});

// Endpoint to insert API data into the SQLite database
app.post('/addAPIdata', (req, res) => {
  const cleansedAPIdata = cleanseString(req.body.APIdata);
  // const { username } = req.body; // Assuming you're also inserting the username

  // Prepare the SQL statement for inserting the dream and timestamp
  const sql = 'INSERT INTO Dreams (dream, time) VALUES (?, ?)';

  // Get the current Unix timestamp
  const timestamp = currentUnixTimestamp();

  // Insert the cleansed dream and timestamp into the database
  db.run(sql, [cleansedAPIdata, timestamp], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      // Respond with the ID of the newly inserted row and the username
      res.status(201).json({ id: this.cleansedAPIdata, timestamp });
  });
});

// endpoint to clear dreams from the database
app.get("/clearDreams", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.each(
      "SELECT * from Dreams",
      (err, row) => {
        console.log("row", row);
        db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
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

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});