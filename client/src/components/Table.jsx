import * as React from "react";
import {
  useEffect,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import config from "../config.json";

import axios from "axios";
// import TimePicker from 'react-time-picker';
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

const columns = Object.keys(config.databases.db1_columns);
// console.log(columns,'columns')
const column_val = Object.values(config.databases.db1_columns);
// console.log(column_val,'column_val')

const db_values = Object.values(config.databases);
// const db_keys = Object.keys(config.databases)

const oddIndices_db_values = db_values.filter((_, index) => index % 2 !== 0);

let x;
oddIndices_db_values.map((item, index) => {
  x = item;
  return x;
});

// const columns = Object.values(x)
// const column_val = Object.keys(x)

const format = "h:mm:ss a";

const now = moment().hour(0).minute(0);

const RealTimeDataTable = forwardRef((props, ref) => {
  const [chartData, setChartData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(200);
  const isFirstEffectUpdate = useRef(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const updateChartData = (data) => {
      setChartData((prevChartData) => {
        const newChartData = [...prevChartData];

        newChartData.push(data);

        return newChartData;
      });
    };
  }, []);

  // const fetchData = async () => {
  //   try {
  //     let url = "http://localhost:8080/api/data";
  //     if (startDate && endDate) {
  //       url = `http://localhost:8080/api/data/filter?startDate=${startDate}&endDate=${endDate}`;
  //       // console.log("filter vala", url);
  //     }
  //     const response = await axios.get(url);
  //     // console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
  //     setChartData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchData = async () => {
    try {
      let url = "http://localhost:8080/api/data";
      if (startDate && endDate || startTime && endTime) {
        url = `http://localhost:8080/api/data/filter?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`;
        // console.log("filter vala", url);
      }
      const response = await axios.get(url);
      // console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchFilterData = async () => {
  //   try {
  //     const url = `http://localhost:8080/api/data/filter?startDate=${startDate}&endDate=${endDate}`;
  //     const response = await axios.get(url);
  //     // console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
  //     setChartData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchFilterData = async () => {
    try {
      const url = `http://localhost:8080/api/data/filter?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`;
      const response = await axios.get(url);
      // console.log(response.data, "lol", response.data.length, "hehehehe 1st time")
      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // This useEffect is called when component is mounted , data is fecthed from backend for the 1st time
  useEffect(() => {
    fetchData();
  }, []);

  // This effect runs whenever the chartData state changes
  //   useEffect(() => {
  //     const fetchNewData = async () => {
  //       try {
  //         // Wait for 3 seconds before making the API call again
  //         await new Promise((resolve) => setTimeout(resolve, 3000));

  //         const response = await axios.get("http://localhost:8080/api/data");
  //         // console.log(response.data, "fetchNewData ka response.data")
  //         setChartData(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     const timer = setTimeout(() => {
  //       fetchNewData();
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [chartData]);

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

  const handleApplyFilter = () => {
    console.log("handleApplyFilter");
    fetchFilterData();
  };

  function onStartTimeChange(value) {
    console.log(value.format(format), "starttime");
    setStartTime(value.format(format));
  }

  function onEndTimeChange(value) {
    console.log(value.format(format), "endtime");
    setEndTime(value.format(format));
  }

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
              {chartData
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
        <div className="table-filters flex">
          <div>
            <input
              className="filter-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="filter-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <TimePicker
              className="filter-input"
              showSecond={true}
              defaultValue={now}
              // value={startTime}
              onChange={onStartTimeChange}
              format={format}
              use12Hours
              inputReadOnly
            />
            <TimePicker
              className="filter-input"
              showSecond={true}
              defaultValue={now}
              // value={endTime}
              onChange={onEndTimeChange}
              format={format}
              use12Hours
              inputReadOnly
            />

            <Button
              className="filter-btns"
              variant="contained"
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
          </div>
          <TablePagination
            rowsPerPageOptions={[200, 500, 1000]}
            component="div"
            count={chartData.length}
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
