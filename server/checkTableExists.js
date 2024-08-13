// checkTableExists.js

const checkTableExists = (db, tableName) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
        if (err) {
          console.error(`Error checking for table ${tableName}: `, err.message);
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    });
  };

module.exports = { checkTableExists };