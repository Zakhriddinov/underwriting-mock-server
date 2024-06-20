const express = require("express");
const bodyParser = require("body-parser");
const employeeRouting = require("./routing/employee");
const rolesRouting = require("./routing/role");
const employeeCodeRouting = require("./routing/employeeCode");
const navItemRouting = require("./routing/navItem");
const referencesRouting = require("./routing/references");
const verificationRouting = require("./routing/verification");
const subsegmentRouting = require("./routing/subsegment");
const checkListRouting = require("./routing/check-list");
const stagesRouting = require("./routing/stages");
const parameterListRouting = require("./routing/parameter-list");

// Serve static files from the "public" directory


const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use("/employees/", employeeRouting);
app.use("/roles/", rolesRouting);
app.use("/employee-code/", employeeCodeRouting);
app.use("/", navItemRouting);
app.use("/references/", referencesRouting);
app.use("/verification/", verificationRouting);
app.use("/subsegment/", subsegmentRouting);
app.use("/check-list/", checkListRouting);
app.use("/stages/", stagesRouting);
app.use("/parameter-list/", parameterListRouting);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});