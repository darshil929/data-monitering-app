import React, { useRef } from 'react';
import Table from '../Table';
import RealTimeDataChart from '../Chart/LineChart';
import { Button } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';

const Database1 = () => {
    const chartRef = useRef(null);

    const resetChartZoom = () => {
        chartRef.current.getChartInstance().resetZoom();
    };

    const zoomIn = () => {
        chartRef.current.getChartInstance().zoom(1.1);
    };

    const zoomOut = () => {
        chartRef.current.getChartInstance().zoom(0.9);
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
            <Tooltip title="Reset" arrow>
                <Button variant="contained" className='graph-options' onClick={resetChartZoom}>
                    <RotateLeftIcon></RotateLeftIcon>
                </Button>
            </Tooltip>
            <Tooltip title="Zoom In" arrow>
                <Button variant="contained" className='graph-options' onClick={zoomIn}>
                    <ZoomInIcon></ZoomInIcon>
                </Button>
            </Tooltip>
            <Tooltip title="Zoom Out" arrow>
                <Button variant="contained" className='graph-options' onClick={zoomOut}>
                    <ZoomOutIcon></ZoomOutIcon>
                </Button>
            </Tooltip>
            <Tooltip title="Download Report" arrow>
                <Button variant="contained" className='graph-options' onClick={handleDownloadPDF}>
                    <FileDownloadIcon></FileDownloadIcon>
                </Button>
            </Tooltip>
            <h1>Tabular Data</h1>
            <Table />
        </>
    );
};

export default Database1;
