import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// const updateChartData = () => {
//     setChartData((prevChartData) => ({
//       ...prevChartData,
//       labels: ['New Label 1', 'New Label 2', 'New Label 3'],
//       datasets: [
//         {
//           ...prevChartData.datasets[0],
//           data: [10, 20, 30],
//         },
//       ],
//     }));
//   };

// const Graph = () => {
//   const [GraphData, setGraphData] = useState({
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: 'Example1 Dataset',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//       {
//         label: 'Example2 Dataset',
//         data: [20, 1, 13, 15, 12, 7],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   });

//   return (
//     <div>
//       <Line data={GraphData} />
//     </div>
//   );
// };

// export default Graph;

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Example Dataset',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Example Dataset',
        data: [45, 79, 90, 31, 76, 95],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Example Dataset',
        data: [95, 49, 20, 11, 96, 35],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  });

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;