import React, { useEffect, useState, useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import config from '../../config.json';
import axios from 'axios';

Chart.register(zoomPlugin);

const db_values = Object.values(config.databases);
const evenIndices_db_values = db_values.filter((_, index) => index % 2 === 0);
const tabNames = evenIndices_db_values;

const oddIndices_db_values = db_values.filter((_, index) => index % 2 !== 0);
let x;
oddIndices_db_values.map((item, index) => {
  x = item;
  return x;
});

const y = Object.values(x);
const axesName = y.filter((_, index) => index !== 0);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const RealTimeDataChart = forwardRef((props, ref) => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: axesName.map((item, index) => ({
      label: item,
      i: console.log(item,'capital column name'),
      data: [],
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    })),
  });

  useEffect(() => {
    const updateChartData = (data) => {
      console.log(data,"updatechartdata ")
      // setChartData((prevChartData) => {
      //   const newChartData = { ...prevChartData };
      //   console.log(newChartData,"ooo")

      //   newChartData.labels.push(data.time);
      //   axesName.forEach((item, index) => {
      //     newChartData.datasets[index].data.push(data[item]);
      //   });

      //   if (newChartData.labels.length > 200) {
      //     newChartData.labels.shift();
      //     axesName.forEach((item, index) => {
      //       newChartData.datasets[index].data.shift();
      //     });
      //   }

      //   return newChartData;
      // });
    };
    updateChartData();
  }, [chartData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/data');
          // console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
          setChartData(response.data)
      } catch (error) {
          console.error(error);
      }
  };
  fetchData();
},[]);

  useEffect(() => {
    const fetchNewData = async () => {
        try {
            // Wait for 3 seconds before making the API call again
            await new Promise(resolve => setTimeout(resolve, 3000));

            const response = await axios.get('http://localhost:8080/api/data');
            // console.log(response.data, "fetchNewData ka response.data")
            setChartData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const timer = setTimeout(() => {
        fetchNewData();
      }, 2000);
    
      return () => {
        clearTimeout(timer);
      };
},[chartData]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d', { willReadFrequently: true });
      console.log(chartData,'ok')
      if (!chartRef.current.chartInstance) {
        chartRef.current.chartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          i: console.log(chartData,' graphokkk'),
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
