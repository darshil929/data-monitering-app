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

const Graph = () => {
  const [GraphData, setGraphData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Example1 Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Example2 Dataset',
        data: [20, 1, 13, 15, 12, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  return (
    <div>
      <Line data={GraphData} />
    </div>
  );
};

export default Graph;
