import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import './Chart.css';
import config from '../../config.json';
import axios from 'axios';
// import zoomPlugin from 'chartjs-plugin-zoom';
// Chart.register(zoomPlugin);

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
console.log(axesName, "axesName")

// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

const ChartComponent = () => {

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    let chart1Instance;
    let chart2Instance;
    const [boxWidth, setBoxWidth] = useState('');
    const [chartData, setChartData] = useState({});
    const dates = [];
    const temperatures = [];

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/data');
            console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
            setChartData(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(chartData)
    }, [chartData]);

    for (let i = 0; i < Object.keys(chartData).length; i++) {
        const row = chartData[i];
        const date = row.Date;
        const temperature = parseInt(row.Temperature);
        dates.push(date);
        temperatures.push(temperature);
    }

    useEffect(() => {
        const ctx1 = chartRef1.current.getContext('2d');
        const chart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                  label: 'Temperature',
                  data: temperatures,
                  backgroundColor: [
                    'rgba(255, 26, 104, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 26, 104, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 0, 0, 1)',
                  ],
                  borderWidth: 1,
                }],
              },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                    },
                },
                scales: {
                    y: {
                        // display: true,
                        // beginAtZero: true,
                        ticks: {
                            display: false,
                        },
                        grid: {
                            drawTicks: false,
                            drawBorder: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        chart1Instance = chart1;

        return () => {
            chart1.destroy();
        };

    }, []);

    useEffect(() => {

        const dt = chart1Instance?.data.datasets[0].data;

        const ctx2 = chartRef2.current.getContext('2d');
        const chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                  label: 'Temperature',
                  data: [],
                }],
              },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        bottom: 40,
                        // top:10,
                    },
                },
                scales: {
                    x: {
                        // display: true,
                        ticks: {
                          display: false,
                        },
                        grid: {
                          drawTicks: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        afterFit: (ctx) => {
                          ctx.width = 40;
                        },
                      },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        chart2Instance = chart2;

        return () => {
            chart2.destroy();
        };

    }, []);


    useEffect(() => {
        const barLength = chart1Instance?.data.labels.length || 0;

        if (barLength > 7) {
            const chartWidth = 700 + (barLength - 7) * 30;
            setBoxWidth(`${chartWidth}px`);
        } else {
            setBoxWidth('');
        }
    }, [chart1Instance]);

    return (
        <div className='chartCard'>
            <div className='chartBox'>
                <div className='colSmall'>
                    <canvas id='myChart2' ref={chartRef2}></canvas>
                </div>
                <div className='colLarge'>
                    <div className='box' style={{ width: boxWidth }}>
                        <canvas id='myChart1' ref={chartRef1}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;