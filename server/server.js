const express = require("express");
const http = require("http");
const { Server } = require("ws");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const dataController = require("./controllers/dataController");
// const dataRoute = require("./routes/dataRoute");

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

app.use(express.static("public"));
app.use(cors());

app.get("/api/data", dataController.getData);

app.get("/api/", (req, res) => {
  res.json("Yay API!");
});

wss.on("connection", dataController.handleWebSocket);

app.get("/", (req, res) => {
  res.json("Yay!");
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
  dataController.generateAndAppendData();
});


