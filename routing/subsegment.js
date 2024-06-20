const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { log } = require("console");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/subsegment.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/subsegment.json", JSON.stringify(data, null, 2));
};

router.post("/ql/:id", (req, res) => {
  const data = readData();
  res.json(data);
});

router.get("/ql/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const ql = data.filter((item) => item?.userId === id);
  res.json(ql);
});

router.put("/:id", (req, res) => {
  let data = readData();
  const id = req.params.id;
  const updateRef = req.body;

  const ids = data.map((item) => item.id);

//   if (ids.every((id) => updateRef.subsegments.includes(id))) {
//     data.forEach((item) => {
//       item.userId = id;
//     });
//   }
//   console.log(data)
  writeData(data);
  res.json(data);
});

router.get("/list", (req, res) => {
  const data = readData();
  res.json(data);
});
module.exports = router;
