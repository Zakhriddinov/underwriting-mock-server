const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/role.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/role.json", JSON.stringify(data, null, 2));
};

//
router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

// GET all role
router.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

// GET role by ID
router.get("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const role = data.find((emp) => emp.id === id);
  if (role) {
    res.json(role);
  } else {
    res.status(404).send("role not found");
  }
});

// POST new employee
router.post("/create", (req, res) => {
  const data = readData();
  const newRole = req.body;
  newRole.id = uuid.v4();
  newRole.stateText = "Актив";
  newRole.isBind = 0;
  data.push(newRole);
  writeData(data);
  res.json(newRole);
});

// PUT update role by ID
router.put("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const updateRole = req.body;

  if (updateRole.state === "A") {
    updateRole.stateText = "Актив";
  } else if (updateRole.state === "P") {
    updateRole.stateText = "Пассивный";
  }

  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index] = { id, ...updateRole };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Role not found");
  }
});

module.exports = router;
