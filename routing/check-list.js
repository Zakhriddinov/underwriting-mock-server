const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
const uuid = require("uuid");

const dataPath = path.join(__dirname, "db", "check-list.json");
const stagesDataPath = path.join(__dirname, "db", "stages.json");

router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});
const readData = () => {
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

const readDataStages = () => {
  const data = fs.readFileSync(stagesDataPath, "utf8");
  return JSON.parse(data);
};

function findStagesName(stagesId) {
  const stagesData = readDataStages();
  const findStageName = stagesData.find((v) => v.id === stagesId);
  return findStageName.name;
}

app.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST new
app.post("/create", (req, res) => {
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
app.get("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const list = data.find((emp) => emp.id === id);
  if (list) {
    res.json(list);
  } else {
    res.status(404).send("list not found");
  }
});

app.put("/:id", (req, res) => {
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
