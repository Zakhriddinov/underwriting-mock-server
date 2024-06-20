const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync("db/employeeCode.json");
  return JSON.parse(data);
};

// const writeData = (data) => {
//   fs.writeFileSync("db/employeeCode.json", JSON.stringify(data, null, 2));
// };

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

module.exports = router;
