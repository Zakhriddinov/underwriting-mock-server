const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/navItem.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/navItem.json", JSON.stringify(data, null, 2));
};

router.get("/1.0.0/nav-items", (req, res) => {
  const data = readData();
  res.json(data);
});

module.exports = router;
