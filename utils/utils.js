const fs = require("fs/promises");

//helps yo read the file
function readData() {

  // This function will read the data from the db.json file and return the data
  return fs.readFile("db.json", "utf-8").then((data) => {
    return JSON.parse(data.toString());
  });
}

module.exports = {
    readData
}