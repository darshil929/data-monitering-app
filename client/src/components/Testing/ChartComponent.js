import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.options.responsive = true;
        chartInstance.options.maintainAspectRatio = false;
        chartInstance.update();
      }
    }
  }, [chartData]);

  const labels = chartData.map((data) => data.Date);
  const temperatures = chartData.map((data) => data.Temperature);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: '800px', overflowX: 'auto' }}>
      <div style={{ width: '1600px' }}>
        <Line ref={chartRef} data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Chart;
