import React, { useEffect, useState, useRef,useContext } from "react";
import { SocketContext } from '../../../src/App';
import Chart from "chart.js/auto";

const RealTimeDataChart = () => {
  const socket = useContext(SocketContext);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
      {
        label: "Humidity",
        data: [],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
      {
        label: "Pressure",
        data: [],
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:8080");

    // socket.addEventListener("open", () => {
    //   console.log("WebSocket connection established");
    // });

    socket.addEventListener("message", (event) => {
      // console.log('Connection Established')
      const data = JSON.parse(event.data);
      console.log(data)
      updateChartData(data);
    });

    // socket.addEventListener("close", () => {
    //   console.log("WebSocket connection closed");
    // });

    // return () => {
    //   socket.close();
    // };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      chartRef.current.chartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
      });
    }
  }, [chartData]);

  const updateChartData = (data) => {
    setChartData((prevChartData) => {
      const newChartData = { ...prevChartData };

      newChartData.labels.push(data.time);
      newChartData.datasets[0].data.push(data.temperature);
      newChartData.datasets[1].data.push(data.humidity);
      newChartData.datasets[2].data.push(data.pressure);

      if (newChartData.labels.length > 10) {
        newChartData.labels.shift();
        newChartData.datasets[0].data.shift();
        newChartData.datasets[1].data.shift();
        newChartData.datasets[2].data.shift();
      }

      return newChartData;
    });
  };

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default RealTimeDataChart;
