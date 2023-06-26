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
import config from './config.json';
import { Link } from 'react-router-dom';

const columns = Object.keys(config.table);
const column_val = Object.values(config.table);
console.log(columns,"lol")
console.log(column_val,"lol2")

const RealTimeDataTable = forwardRef((props, ref) => {
    const socket = useContext(SocketContext);
    const [chartData, setChartData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(200);

    useEffect(() => {
        const updateChartData = (data) => {
            setChartData((prevChartData) => {
                const newChartData = [...prevChartData];

                newChartData.push(data);

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



    //   return (
    //     <TableContainer component={Paper}>
    //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //         <TableHead>
    //           <TableRow>
    //             {columns.map((column) => (
    //               <TableCell align="right" key={column}>
    //                 <Link to={`/table/${column}`}>
    //                   {config.table[column]}
    //                 </Link>
    //               </TableCell>
    //             ))}
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {/* Render table rows here */}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   );

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {console.log(config.table, 'sdhbgsdfhdh')}
                            {columns.map((c) => (
                                <TableCell align="center" key={c}>
                                    <Link to={`/table/${c}`}>
                                        {config.table[c]}
                                    </Link>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chartData
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((row, c) => (  
                                <TableRow hover role="checkbox" tabIndex={-1} key={c}>

                                    {column_val.map((c) => {
                                        console.log(c, 'pvgud')
                                        console.log("kreena",row);
                                        console.log("k",row[c]);
                                        const value = row[c]
                                        return (
                                            <TableCell key={c} align="center">
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
                rowsPerPageOptions={[200, 500, 1000]}
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
