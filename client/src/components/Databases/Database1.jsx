import React, { useRef } from 'react';
import Table from '../Table';
import RealTimeDataChart from '../Chart/LineChart';

const Database1 = () => {
  const chartRef = useRef(null);

  const resetChartZoom = () => {
    chartRef.current.getChartInstance().resetZoom();
  };

  const handleDownloadPDF = () => {
    const chartInstance = chartRef.current.getChartInstance();
    // Use chartInstance for further operations
  };

  return (
    <>
      <div className="graph-container">
        <RealTimeDataChart ref={chartRef} />
      </div>
      <button onClick={resetChartZoom}>Reset</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <h1>Tabular Data</h1>
      <Table />
    </>
  );
};

export default Database1;
