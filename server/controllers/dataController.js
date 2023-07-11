const fs = require("fs");
const csv = require("csv-parser");
const Chance = require("chance");
const chance = new Chance();
const filePath = "data.csv";
let clients = [];

function sendRealtimeData(data) {
  clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
}

const generateRandomData = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp).toISOString().split("T")[0];
  const month = new Date(timestamp).toLocaleString("default", {
    month: "long",
  });
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
};

const readCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const getData = async (req, res) => {
  try {
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const filterData = async (req, res) => {
  const { startDate, endDate, startTime, endTime } = req.query;
  console.log(startTime, "startTime");
  console.log(endTime, "endTime");

  const data = await readCSVFile(filePath);

  const filteredData = data.filter((row) => {
    return row.Date >= startDate && row.Date <= endDate;
  });

  const filteredTimeData = filteredData.filter((row) => {
    return row.Time >= startTime && row.Time <= endTime;
  });

  res.json(filteredTimeData);
};

// const filteredTimeData =

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

  setTimeout(generateAndAppendData, 1); // Generate data every 1 second
}

module.exports = {
  sendRealtimeData,
  getData,
  generateAndAppendData,
  filterData,
};
