const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/references.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/references.json", JSON.stringify(data, null, 2));
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
    res.status(404).send("ref not found");
  }
});

router.post("/create", (req, res) => {
  const data = readData();
  const newRef = req.body;
  newRef.id = uuid.v4();
  newRef.state = "A";
  newRef.stateText = "Актив";

  data.push(newRef);
  writeData(data);
  res.json(newRef);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const updateRef = req.body;

  if (updateRef.state === "A") {
    updateRef.stateText = "Актив";
  } else if (updateRef.state === "P") {
    updateRef.stateText = "Пассивный";
  }

  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index] = { id, ...updateRef };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("ref not found");
  }
});

router.delete("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const deletedRef = data.splice(index, 1);
    writeData(data);
    res.json(deletedRef);
  } else {
    res.status(404).send("Ref not found");
  }
});

module.exports = router;
