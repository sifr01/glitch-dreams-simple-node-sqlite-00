// databaseUtils.js
const insertDummyData = (db, data) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO TideTimes (tideTimesObject, time) VALUES (?, ?)',
        data,
        (err) => {
          if (err) {
            console.error("Error inserting dummy data:", err.message);
            reject(err);
          } else {
            console.log("Dummy data inserted successfully!");
            resolve();
          }
        }
      );
    });
  };
  
  module.exports = { insertDummyData };  