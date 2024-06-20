const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/parameter-list.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/parameter-list.json", JSON.stringify(data, null, 2));
};

//
router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

router.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

module.exports = router;