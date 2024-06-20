const express = require("express");
const fs = require("fs");

const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
const uuid = require("uuid");

const readData = () => {
  const data = fs.readFileSync("db/check-list.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/check-list.json", JSON.stringify(data, null, 2));
};

const readDataStages = () => {
  const data = fs.readFileSync("db/stages.json");
  return JSON.parse(data);
};

router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

router.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

function findStagesName(stagesId) {
  const stagesData = readDataStages();
  const findStageName = stagesData.find((v) => v.id === stagesId);
  return findStageName.name;
}

// POST new
router.post("/create", (req, res) => {
  const data = readData();
  const newQuestion = req.body;
  newQuestion.id = uuid.v4();
  newQuestion.stateText = "Актив";
  newQuestion.stagesName = findStagesName(newQuestion.stagesId);
  newQuestion.typeName = "Юр.";
  newQuestion.code = data.length + 1;
  data.push(newQuestion);
  writeData(data);
  res.json(newQuestion);
});

// GET role by ID
router.get("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const list = data.find((emp) => emp.id === id);
  if (list) {
    res.json(list);
  } else {
    res.status(404).send("list not found");
  }
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
  updateData.stagesName = findStagesName(updateData.stagesId);
  updateData.typeName = "Юр.";
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index] = { id, ...updateData };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Role not found");
  }
});
module.exports = router;
