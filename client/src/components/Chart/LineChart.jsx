import React, { useEffect, useState, useRef, useContext } from 'react';
import { SocketContext } from '../../../src/App';
import Chart from 'chart.js/auto';

const RealTimeDataChart = () => {
  const socket = useContext(SocketContext);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
      {
        label: 'Humidity',
        data: [],
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
      {
        label: 'Pressure',
        data: [],
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const updateChartData = (data) => {
      setChartData((prevChartData) => {
        const newChartData = { ...prevChartData };

        newChartData.labels.push(data.time);
        newChartData.datasets[0].data.push(data.temperature);
        newChartData.datasets[1].data.push(data.humidity);
        newChartData.datasets[2].data.push(data.pressure);

        if (newChartData.labels.length > 200) {
          newChartData.labels.shift();
          newChartData.datasets[0].data.shift();
          newChartData.datasets[1].data.shift();
          newChartData.datasets[2].data.shift();
        }

        return newChartData;
      });
    };

    const handleSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      updateChartData(data);
    };

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (!chartRef.current.chartInstance) {
        chartRef.current.chartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            animation: {
              duration: 0, // Disable chart animation
            },
          },
        });
      } else {
        chartRef.current.chartInstance.data = chartData;
        chartRef.current.chartInstance.update();
      }
    }
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default RealTimeDataChart;
