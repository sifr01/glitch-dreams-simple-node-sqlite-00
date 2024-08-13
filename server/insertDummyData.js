// databaseUtils.js
const insertDummyData = (db, tableName, data) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${tableName} (${tableName}Object, time) VALUES (?, ?)`,
        data,
        (err) => {
          if (err) {
            console.error(`Error inserting dummy data into table ${tableName}:`, err.message);
            reject(err);
          } else {
            console.log(`Dummy data inserted successfully into table ${tableName}!`);
            resolve();
          }
        }
      );
    });
  };
  
  module.exports = { insertDummyData };  