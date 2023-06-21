import React, { useEffect, useState, useRef,useContext, forwardRef, useImperativeHandle } from 'react';
import { SocketContext } from '../../../src/App';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

const RealTimeDataChart = forwardRef((props, ref) => {
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
      const ctx = chartRef.current.getContext('2d', { willReadFrequently: true });

      if (!chartRef.current.chartInstance) {
        chartRef.current.chartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            animation: {
              duration: 0,
            },
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                    speed: 0.05,
                  },
                  drag: {
                    enabled: true,
                    modifierKey: 'shift',
                  },
                },
                pan: {
                  enabled: true,
                  mode: 'xy',
                },
              },
            },
          },
        });
      } else {
        chartRef.current.chartInstance.data = chartData;
        chartRef.current.chartInstance.update();
      }
    }
  }, [chartData]);

  useImperativeHandle(ref, () => ({
    getChartInstance: () => chartRef.current.chartInstance,
    resetZoom: () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.resetZoom();
      }
    },
  }));

  return (
    <div>
      <div>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
});

export default RealTimeDataChart;
