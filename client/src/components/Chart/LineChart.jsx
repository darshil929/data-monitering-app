import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import './Chart.css';

// const ChartComponent = (props) => {
//     const { apidata } = props;
//     console.log(apidata, "response.data 1st time valaaaaa from chart");

//     const chartRef = useRef(null);
//     const [chartInstance, setChartInstance] = useState(null);

//     useEffect(() => {

//         const times = [];
//         const temperature = [];
//         const pressure = [];
//         const humidity = [];

//         const dataSize = apidata.length;
//         const dataLimit = 5000; // Maximum data points to display without downsampling

//         if (dataSize <= dataLimit) {
//             for (let i = 0; i < dataSize; i++) {
//                 const row = apidata[i];
//                 const timestamp = row.Timestamp;
//                 const time = timestamp.substring(11, 19);
//                 const date = timestamp.substring(0, 10);
//                 const temp = parseInt(row.Temperature);
//                 const press = parseInt(row.Pressure);
//                 const humid = parseInt(row.Humidity)
//                 times.push(`${date} ${time}`);
//                 temperature.push(temp);
//                 pressure.push(press)
//                 humidity.push(humid)
//             }
//         } 
//         else {
//             const skip = Math.ceil(dataSize / dataLimit);
//             for (let i = 0; i < dataSize; i += skip) {
//                 const row = apidata[i];
//                 const timestamp = row.Timestamp;
//                 const time = timestamp.substring(11, 19);
//                 const date = timestamp.substring(0, 10);
//                 const temp = parseInt(row.Temperature);
//                 const press = parseInt(row.Pressure);
//                 const humid = parseInt(row.Humidity)
//                 times.push(`${date} ${time}`);
//                 temperature.push(temp);
//                 pressure.push(press)
//                 humidity.push(humid)
//             }
//         }

//         let chartStatus = Chart.getChart("myChart");
//           if (chartStatus !== undefined) {
//             chartStatus.destroy();
//           }

//         const ctx = chartRef.current.getContext("2d");

//         if (chartInstance) {
//             chartInstance.data.labels = times;
//             chartInstance.data.datasets[0].data = temperature;
//             chartInstance.data.datasets[1].data = pressure;
//             chartInstance.data.datasets[2].data = humidity;
//             chartInstance.update();
//         } else {
//             const chart = new Chart(ctx, {
//                 type: "line",
//                 data: {
//                     labels: times,
//                     datasets: [
//                         {
//                             label: "Temperature",
//                             data: temperature,
//                             borderWidth: 0.7,
//                             pointRadius: 0,
//                         },
//                         {
//                             label: "Pressure",
//                             data: pressure,
//                             borderWidth: 0.7,
//                             pointRadius: 0,
//                         },
//                         {
//                             label: "Humidity",
//                             data: humidity,
//                             borderWidth: 0.7,
//                             pointRadius: 0,
//                         },
//                     ],
//                 },
//                 options: {
//                     maintainAspectRatio: false,
//                     layout: {
//                         padding: {
//                             top: 10,
//                         },
//                     },
//                     scales: {
//                         x: {
//                             min: 0,
//                             max: 60,
//                         },
//                         y: {
//                             ticks: {
//                                 display: true,
//                             },
//                             grid: {
//                                 drawTicks: false,
//                                 drawBorder: false,
//                             },
//                         },
//                     },
//                     plugins: {
//                         legend: {
//                             display: true,
//                         },
//                     },
//                 },
//             });
//             setChartInstance(chart);
//         }
//     });

//     useEffect(() => {
//         const scroller = (e) => {
//             e.preventDefault()
//             const { deltaY } = e;
//             const { min, max } = chartInstance.config.options.scales.x;

//             if (deltaY > 0 && max < chartInstance.config.data.labels.length - 1) {
//                 chartInstance.config.options.scales.x.min += 60;
//                 chartInstance.config.options.scales.x.max += 60;
//             } else if (deltaY < 0 && min > 0) {
//                 chartInstance.config.options.scales.x.min -= 60;
//                 chartInstance.config.options.scales.x.max -= 60;
//             }

//             chartInstance.update();
//         };

//         if (chartInstance) {
//             chartRef.current.addEventListener("wheel", scroller, { passive: true });
//         }
            
//     });

//     return (
//         <div className="chart_container">
//             <canvas ref={chartRef}></canvas>
//         </div>
//     );
// };

const ChartComponent = (props) => {
    const { apidata } = props;
    console.log(apidata, "response.data 1st time valaaaaa from chart");
  
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
  
    useEffect(() => {
    const times = [];
    const datasets = [];

    const dataSize = apidata.length;
    const dataLimit = 5000; // Maximum data points to display without downsampling

    if (dataSize <= dataLimit) {
      apidata.forEach((row) => {
        const timestamp = row.Timestamp;
        const time = timestamp.substring(11, 19);
        const date = timestamp.substring(0, 10);
        
        const data = {};

        Object.keys(row).forEach((key) => {
            if (key !== "Timestamp") {
                const lowercaseKey = key.toLowerCase();
                data[lowercaseKey] = parseInt(row[key]);
              }
        });

        times.push(`${date} ${time}`);
        datasets.push(data);
      });
    } else {
      const skip = Math.ceil(dataSize / dataLimit);
      for (let i = 0; i < dataSize; i += skip) {
        const row = apidata[i];
        const timestamp = row.Timestamp;
        const time = timestamp.substring(11, 19);
        const date = timestamp.substring(0, 10);

        const data = {};

        Object.keys(row).forEach((key) => {
            if (key !== "Timestamp") {
                const lowercaseKey = key.toLowerCase();
                data[lowercaseKey] = parseInt(row[key]);
              }
        });

        times.push(`${date} ${time}`);
        datasets.push(data);
        
      }
    }

    console.log(times , datasets ,"times , datasets")

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.data.labels = times;
      chartInstance.data.datasets[0].data = datasets.map((data) => data.temperature);
      chartInstance.data.datasets[1].data = datasets.map((data) => data.pressure);
      chartInstance.data.datasets[2].data = datasets.map((data) => data.humidity);
      chartInstance.update();
    } else {
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Temperature",
              data: datasets.map((data) => data.temperature),
              borderWidth: 0.7,
              pointRadius: 0,
            },
            {
              label: "Pressure",
              data: datasets.map((data) => data.pressure),
              borderWidth: 0.7,
              pointRadius: 0,
            },
            {
              label: "Humidity",
              data: datasets.map((data) => data.humidity),
              borderWidth: 0.7,
              pointRadius: 0,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
            },
          },
          scales: {
            x: {
              min: 0,
              max: 60,
            },
            y: {
              ticks: {
                display: true,
              },
              grid: {
                drawTicks: false,
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
      setChartInstance(chart);
    }
  }, [apidata]);
  
    useEffect(() => {
      const scroller = (e) => {
        e.preventDefault();
        const { deltaY } = e;
        const { min, max } = chartInstance.config.options.scales.x;
  
        if (deltaY > 0 && max < chartInstance.config.data.labels.length - 1) {
          chartInstance.config.options.scales.x.min += 60;
          chartInstance.config.options.scales.x.max += 60;
        } else if (deltaY < 0 && min > 0) {
          chartInstance.config.options.scales.x.min -= 60;
          chartInstance.config.options.scales.x.max -= 60;
        }
  
        chartInstance.update();
      };
  
      if (chartInstance) {
        chartRef.current.addEventListener("wheel", scroller, { passive: true });
      }
    }, [chartInstance]);
  
    return (
      <div className="chart_container">
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };
  
export default ChartComponent;
  

// export default ChartComponent;
