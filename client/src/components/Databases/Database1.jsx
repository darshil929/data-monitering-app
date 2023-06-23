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

const Database1 = () => {

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
            <Button variant="contained" className='graph-btns' onClick={resetChartZoom}>
              <RotateLeftIcon></RotateLeftIcon>
            </Button>
          </Tooltip>
          <Tooltip title="Zoom In" arrow>
            <Button variant="contained" className='graph-btns' onClick={zoomIn}>
              <ZoomInIcon></ZoomInIcon>
            </Button>
          </Tooltip>
          <Tooltip title="Zoom Out" arrow>
            <Button variant="contained" className='graph-btns' onClick={zoomOut}>
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
            <Button variant="contained" className='graph-btns' onClick={handleClickOpen}>
              <FileDownloadIcon></FileDownloadIcon>
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              {/* <DialogTitle>Export As</DialogTitle> */}
              <DialogContent>
                <Box sx={{ display: 'flex' }}>
                  <Button variant="contained" className='export-options'>PDF</Button>
                  <Button variant="contained" className='export-options'>CSV</Button>
                  <Button variant="contained" className='export-options'>Excel</Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Ok</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Tooltip>
      </div>
      <Table />
    </>
  );
};

export default Database1;
