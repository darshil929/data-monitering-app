// const fs = require("fs");
// const csv = require("csv-parser");
// const Chance = require("chance");
// const chance = new Chance();
// const filePath = "data.csv";
// let clients = [];

// function sendRealtimeData(data) {
//   clients.forEach((client) => {
//     client.send(JSON.stringify(data));
//   });
// }

// const generateRandomData = () => {
//     const timestamp = Date.now();
//     const date = new Date(timestamp).toLocaleDateString();
//     const month = new Date(timestamp).toLocaleString("default", {month: "long",});
//     const time = new Date(timestamp).toLocaleTimeString();
//     const temperature = chance.integer({ min: 20, max: 400 });
//     const humidity = chance.integer({ min: 30, max: 700 });
//     const pressure = chance.integer({ min: 800, max: 1200 });

//   return {
//     date,
//     month,
//     time,
//     pressure,
//     temperature,
//     humidity,
//   };
// }

// const getData = (req, res) => {
//   const results = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("data", (data) => {
//       results.push(data);
//     })
//     .on("end", () => {
//       console.log(results)
//       res.json(results);
//     })
//     .on("error", (error) => {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     });
// }

// function generateAndAppendData() {
//   const data = generateRandomData();

//   // Check if the file already exists
//   const fileExists = fs.existsSync(filePath);

//   // Append the data to the file
//   fs.appendFile(
//     filePath,
//     `${
//       fileExists
//         ? ""
//         : "Date,Month,Time,Pressure,Temperature,Humidity\n"
//     }${data.date},${data.month},${data.time},${
//       data.pressure
//     },${data.temperature},${data.humidity}\n`,
//     (error) => {
//       if (error) {
//         console.error("Error appending data:", error);
//       }
//     }
//   );

//   sendRealtimeData(data);

//   setTimeout(generateAndAppendData, 100); // Generate data every 1 second
// }

// module.exports = {
//   sendRealtimeData,
//   getData,
//   generateAndAppendData,
// };

const fs = require("fs");
const csv = require("csv-parser");
const Chance = require("chance");
const chance = new Chance();
const filePath = "data.csv";
let fetchedData = [];
let lastestDataIndex = -1;

function generateRandomData() {
  const timestamp = Date.now();
  const date = new Date(timestamp).toLocaleDateString();
  const month = new Date(timestamp).toLocaleString("default", { month: "long" });
  const time = new Date(timestamp).toLocaleTimeString();
  const temperature = chance.integer({ min: 20, max: 400 });
  const humidity = chance.integer({ min: 30, max: 700 });
  const pressure = chance.integer({ min: 800, max: 1200 });

  return {
    date,
    month,
    time,
    pressure,
    temperature,
    humidity,
  };
}
function readDataFromCSV() {
  const results = [];

  return new Promise((resolve, reject) => {
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
}

async function initializeData() {
  if (fs.existsSync(filePath)) {
    readDataFromCSV = await readDataFromCSV();
    lastestDataIndex = readDataFromCSV.length - 1;
    console.log("CSV file already exists. Appending data...");
  } else {
    fs.writeFileSync(filePath, "");
    console.log("CSV file not found. Creating new file...");
  }
}

const getData = (req, res) => {
  if (lastestDataIndex === -1) {
    // Fetch and return all data if it's the first API call
    console.log(fetchedData,"cool")
    res.json(fetchedData);
  } else {
    // Get only the newly added data
    const newData = fetchedData.slice(lastestDataIndex + 1);
    lastestDataIndex = fetchedData.length - 1;
    console.log("new data only",newData)
    res.json(newData);
  }
}

function startDataGeneration() {
  setInterval(() => {
    const data = generateRandomData();

    fetchedData.push(data);
    // lastIndex = fetchedData.length - 1;

    // Append the data to the CSV file
    const csvData = `${data.date},${data.month},${data.time},${data.pressure},${data.temperature},${data.humidity}\n`;
    fs.appendFile(filePath, csvData, { flag: "a" }, (error) => {
      if (error) {
        console.error("Error appending data:", error);
      }
    });

    // sendRealtimeData(data);
  }, 1000); // Generate data every 1 second
}

module.exports = {
  initializeData,
  getData,
  startDataGeneration,
};
