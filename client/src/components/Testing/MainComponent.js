import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './ChartComponent';

const MainComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [chartData]);

  return (
    <div>
      <Chart chartData={chartData} />
    </div>
  );
};

export default MainComponent;
