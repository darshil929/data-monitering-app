const express = require("express");
const app = express();
const cors = require("cors");
const dataController = require("./controllers/dataController");

app.use(express.static("public"));
app.use(cors());

app.get("/api/data", dataController.getData);

app.get("/", (req, res) => {
  res.json("Yay!");
});

const port = 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dataController.generateAndAppendData();
});