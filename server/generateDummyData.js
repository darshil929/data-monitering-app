const fs = require('fs');

// Generate a random number between a given range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate the dataset
function generateDataset() {
  const dataset = [];

  // Start and end timestamps for the dataset
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');

  // Generate data every 30 seconds from start to end
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const timestamp = currentDate.toISOString();
    const temperature = getRandomNumber(300, 999);
    const pressure = getRandomNumber(100, 500);
    const humidity = getRandomNumber(250, 750);

    dataset.push({
      timestamp,
      temperature,
      pressure,
      humidity
    });

    currentDate.setTime(currentDate.getTime() + 30 * 1000); // Increment by 30 seconds
  }

  return dataset;
}

// Generate the dataset
const dataset = generateDataset();

// Convert the dataset to CSV format
let csvContent = 'Timestamp,Temperature,Pressure,Humidity\n';
dataset.forEach((dataPoint) => {
  csvContent += `${dataPoint.timestamp},${dataPoint.temperature},${dataPoint.pressure},${dataPoint.humidity}\n`;
});

// Save the dataset to a CSV file
fs.writeFile('1.csv', csvContent, (err) => {
  if (err) throw err;
  console.log('Dataset saved to dataset.csv');
});