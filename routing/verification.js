const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/verification.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/verification.json", JSON.stringify(data, null, 2));
};

router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

router.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const ref = data.find((emp) => emp.id === id);
  if (ref) {
    res.json(ref);
  } else {
    res.status(404).send("verification not found");
  }
});

router.post("/create", (req, res) => {
  const data = readData();
  const newVerification = req.body;
  newVerification.id = uuid.v4();
  newVerification.state = "A";
  newVerification.stateText = "Актив";

  data.push(newVerification);
  writeData(data);
  res.json(newVerification);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const updateData = req.body;

  if (updateData.state === "A") {
    updateData.stateText = "Актив";
  } else if (updateData.state === "P") {
    updateData.stateText = "Пассивный";
  }

  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index] = { id, ...updateData };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("verification not found");
  }
});

router.delete("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const deletedData = data.splice(index, 1);
    writeData(data);
    res.json(deletedData);
  } else {
    res.status(404).send("verification not found");
  }
});

module.exports = router;
