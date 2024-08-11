// currentUnixTimestamp.js

// Function to get the current Unix timestamp
const currentUnixTimestamp = () => {
    return Math.floor(Date.now())
  };
  console.log("app started at: " + currentUnixTimestamp())

module.exports = { currentUnixTimestamp };