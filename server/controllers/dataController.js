const fs = require("fs");
const WebSocket = require("ws");
const csv = require("csv-parser");
const Chance = require("chance");
const chance = new Chance();

const filePath = "data.csv";
let clients = [];

function handleWebSocket(socket) {
  console.log("Client connected")
  clients.push(socket);

  socket.on("close", () => {
    clients = clients.filter((client) => client !== socket);
  });
}

function sendRealtimeData(data) {
  clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
}

function generateRandomData() {
    const timestamp = Date.now();
    const date = new Date(timestamp).toLocaleDateString();
    const month = new Date(timestamp).toLocaleString("default", {month: "long",});
    const time = new Date(timestamp).toLocaleTimeString();
    const temperature = chance.integer({ min: 20, max: 400 });
    const humidity = chance.integer({ min: 30, max: 700 });
    const pressure = chance.integer({ min: 800, max: 1200 });

  return {
    timestamp,
    date,
    month,
    time,
    pressure,
    temperature,
    humidity,
  };
}

const getData = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", (error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
}

function generateAndAppendData() {
  const data = generateRandomData();

  // Check if the file already exists
  const fileExists = fs.existsSync(filePath);

  // Append the data to the file
  fs.appendFile(
    filePath,
    `${
      fileExists
        ? ""
        : "Timestamp,Date,Month,Time,Pressure,Temperature,Humidity\n"
    }${data.timestamp},${data.date},${data.month},${data.time},${
      data.pressure
    },${data.temperature},${data.humidity}\n`,
    (error) => {
      if (error) {
        console.error("Error appending data:", error);
      }
    }
  );

  sendRealtimeData(data);

  setTimeout(generateAndAppendData, 3000); // Generate data every 1 second
}

module.exports = {
  handleWebSocket,
  sendRealtimeData,
  getData,
  generateAndAppendData,
};


