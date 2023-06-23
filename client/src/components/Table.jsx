import * as React from 'react';
import { SocketContext } from '../App';
import { useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'time', label: 'Time', minWidth: 170 },
  { id: 'temperature', label: 'Temperature', minWidth: 170 },
  { id: 'humidity', label: 'Humidity', minWidth: 170 },
  { id: 'pressure', label: 'Pressure', minWidth: 170 },
];

const RealTimeDataTable = forwardRef((props, ref) => {
  const socket = useContext(SocketContext);
  const [chartData, setChartData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const updateChartData = (data) => {
      setChartData((prevChartData) => {
        const newChartData = [...prevChartData];

        newChartData.push(data);

        if (newChartData.length > 200) {
          newChartData.shift();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useImperativeHandle(ref, () => ({
    getChartData: () => chartData,
  }));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={chartData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
});

export default RealTimeDataTable;
