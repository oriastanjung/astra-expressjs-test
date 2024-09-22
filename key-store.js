const VALID_KEYS_PATH = __dirname + "/valid-keys.txt";
const fs = require("fs");
const shortid = require("shortid");
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require("os").EOL;

module.exports = function (req, res) {
  const apiKey = shortid.generate();
  
  fs.appendFile(VALID_KEYS_PATH, apiKey + LINE_ENDING, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(201).json({ apiKey });
  });
};
