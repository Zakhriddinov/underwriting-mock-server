const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/stages.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/stages.json", JSON.stringify(data, null, 2));
};
// GET all role
router.get("/list", (req, res) => {
  const data = readData();
  res.json(data);
});



module.exports = router;
