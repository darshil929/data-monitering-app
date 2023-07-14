import * as React from "react";
import {useState} from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import config from "../../config.json";

const db_values = Object.values(config.databases);
// const db_keys = Object.keys(config.databases)
const columns = Object.keys(config.databases.db1_columns);
// console.log(columns,'columns')
const column_val = Object.values(config.databases.db1_columns);
// console.log(column_val,'column_val')

const RealTimeDataTable = ((props) => {
  const { apidata } = props;
  console.log(apidata.length, "response.data 1st time valaaaaa from table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* {console.log(columns, 'sdhbgsdfhdh')} */}
                {columns.map((c) => (
                  <TableCell align="center" key={c}>
                    {config.databases.db1_columns[c]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {apidata
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((row, c) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={c}>
                    {column_val.map((c) => {
                      const value = row[c];
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
        <div>
          <TablePagination
            rowsPerPageOptions={[200, 500, 1000]}
            component="div"
            count={apidata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </>
  );
});

export default RealTimeDataTable;
