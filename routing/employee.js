const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/employee.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db/employee.json", JSON.stringify(data, null, 2));
};

//
router.post("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

// GET all employees
router.get("/ql", (req, res) => {
  const data = readData();
  res.json(data);
});

// GET employee by ID
router.get("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const employee = data.find((emp) => emp.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

// POST new employee
router.post("/create", (req, res) => {
  const data = readData();
  const newEmployee = req.body;
  newEmployee.id = uuid.v4();
  data.push(newEmployee);

  writeData(data);
  res.json(newEmployee);
});

// PUT update employee by ID
router.put("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const updateEmployee = req.body;
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index] = { id, ...updateEmployee };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Employee not found");
  }
});

// PUT update login and password by ID
router.put("/:id/login-password", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const { login, password } = req.body;
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index].login = login;
    data[index].password = password;
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Employee not found");
  }
});

// PUT update state by ID
router.put("/:id/:state", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const state = req.params.state;
  let stateText = "";

  if (state === "A") {
    stateText = "Актив";
  } else if (state === "P") {
    stateText = "Пассивный";
  } else {
    res.status(400).send("Invalid state value");
    return;
  }

  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    data[index].stateText = stateText;
    data[index].state = state;
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Employee not found");
  }
});

// DELETE employee by ID
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const deletedEmployee = data.splice(index, 1);
    writeData(data);
    res.json(deletedEmployee);
  } else {
    res.status(404).send("Employee not found");
  }
});

module.exports = router;
