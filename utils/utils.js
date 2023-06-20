const fs = require("fs/promises");

//helps yo read the file
function readData() {
  return fs.readFile("db.json", "utf-8").then((data) => {
    return JSON.parse(data.toString());
  });
}

module.exports = {
    readData
}