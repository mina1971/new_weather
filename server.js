// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5050;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, listening);
function listening() {
  console.log(`running on http://localhost:${port}`);
}
// GET route
app.get("/data", (req, res) => {
  res.send(projectData);
});

// POST route
app.post("/send", (req, res) => {
  projectData = req.body;
  res.send("very good");
});
