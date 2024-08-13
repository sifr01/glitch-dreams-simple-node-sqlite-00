// createTable.js

const createTable = (db, tableName) => {
    return new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${tableName}Object TEXT, time INTEGER)`,
        (err) => {
          if (err) {
            console.error(`Error creating table ${tableName}:`, err.message);
            reject(err);
          } else {
            console.log(`New table ${tableName} created!`);
            resolve();
          }
        }
      );
    });
  };

module.exports = { createTable };