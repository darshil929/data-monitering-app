import * as React from 'react';
import { useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import config from '../config.json';
import axios from 'axios';
import { Link } from 'react-router-dom';

const columns = Object.keys(config.databases.db1_columns);
// console.log(columns,'columns')
const column_val = Object.values(config.databases.db1_columns);
// console.log(column_val,'column_val')

const db_values = Object.values(config.databases);
// const db_keys = Object.keys(config.databases)

//Tab Names
const evenIndices_db_values = db_values.filter((_, index) => index % 2 === 0);
const tabNames = evenIndices_db_values;

const oddIndices_db_values = db_values.filter((_, index) => index % 2 !== 0);

let x;
oddIndices_db_values.map((item, index) => {
    x = item;
    return x;
})
// const columns = Object.values(x)
// const column_val = Object.keys(x)
const RealTimeDataTable = forwardRef((props, ref) => {
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

        // const handleSocketMessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     updateChartData(data);
        // };

        // socket.addEventListener('message', handleSocketMessage);

        // return () => {
        //     socket.removeEventListener('message', handleSocketMessage);
        // };

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/data'); // Replace with your API endpoint
                setChartData(response.data)
                // updateChartData(responseData);

            } catch (error) {
                console.error(error);
                // Handle any errors
            }
        };

        fetchData();
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
                            {console.log(columns, 'sdhbgsdfhdh')}
                            {columns.map((c) => (
                                <TableCell align="center" key={c}>
                                    {config.databases.db1_columns[c]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {console.log(chartData, "chartttttttttttttttttttttttttttttttttDataaaaaaaaaa")}
                        {chartData
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((row, c) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={c}>

                                    {column_val.map((c) => {
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
