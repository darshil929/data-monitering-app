import React, { useRef } from 'react';
import Table from '../Table';
import RealTimeDataChart from '../Chart/LineChart';
import { Button } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Database1 = () => {

    const downloadTable = (format) => {
        const table = document.getElementById("table_with_data");
        const tableData = Array.from(table.querySelectorAll("tr")).map((row) =>
          Array.from(row.querySelectorAll("th, td")).map((cell) => cell.textContent)
        );
    
        if (format === "csv") {
          // Export to CSV
          const csvData = tableData.map((row) => row.join(",")).join("\n");
          const csvBlob = new Blob([csvData], { type: "text/csv" });
          const csvUrl = URL.createObjectURL(csvBlob);
          const downloadLink = document.createElement("a");
          downloadLink.href = csvUrl;
          downloadLink.download = "table.csv";
          downloadLink.click();
        } else if (format === "excel") {
          // Export to Excel
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.aoa_to_sheet(tableData);
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
          const excelData = XLSX.write(workbook, {
            type: "binary",
            bookType: "xlsx",
          });
          const excelBlob = new Blob([s2ab(excelData)], {
            type: "application/octet-stream",
          });
          const excelUrl = URL.createObjectURL(excelBlob);
          const downloadLink = document.createElement("a");
          downloadLink.href = excelUrl;
          downloadLink.download = "table.xlsx";
          downloadLink.click();
        } else if (format === "pdf") {
          // Export to PDF
          console.log("fghjkl")
          const doc = new jsPDF();
          autoTable(doc, { html: "#table_with_data" });
          doc.save("table.pdf");
        }
      };
    
      // Convert string to ArrayBuffer
      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      };

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

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
        <div className='graph-header flex'>
            <h1>Graphical Representation</h1>
            <div>
            <Tooltip title="Reset" arrow>
                <Button variant="contained" onClick={resetChartZoom}>
                    <RotateLeftIcon></RotateLeftIcon>
                </Button>
            </Tooltip>
            <Tooltip title="Zoom In" arrow>
                <Button variant="contained" onClick={zoomIn}>
                    <ZoomInIcon></ZoomInIcon>
                </Button>
            </Tooltip>
            <Tooltip title="Zoom Out" arrow>
                <Button variant="contained" onClick={zoomOut}>
                    <ZoomOutIcon></ZoomOutIcon>
                </Button>
            </Tooltip>
            </div>
        </div>
            <div className="graph-container">
                <RealTimeDataChart ref={chartRef} />
            </div>
            <div className='table-header flex'>
                <h1>Tabular Data</h1>
                <Tooltip title="Download Report" arrow>
                    <div>
                        <Button variant="contained" className='graph-options' onClick={handleClickOpen}>
                            <FileDownloadIcon></FileDownloadIcon>
                        </Button>
                        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                            {/* <DialogTitle>Export As</DialogTitle> */}
                            <DialogContent>
                                <Box sx={{ display: 'flex' }}>
                                <Button variant="contained" onClick={() => downloadTable("pdf")} className='export-options'>PDF</Button>
                                <Button variant="contained" onClick={() => downloadTable("csv")} className='export-options'>CSV</Button>
                                <Button variant="contained" onClick={() => downloadTable("excel")} className='export-options'>Excel</Button>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Tooltip>
            </div>
            <div id="table_with_data">
                <Table/>
            </div>
        </>
    );
};

export default Database1;
