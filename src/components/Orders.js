import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as Constants from "./utils/Constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "10px",
  },
  container: {
    maxHeight: 800,
  },
});

const columns = [
  { id: "Order ID", label: "Order\nID", minWidth: 50 },
  { id: "NRIC", label: "NRIC", minWidth: 50 },
  { id: "Country", label: "Country", minWidth: 50 },
  { id: "Region", label: "Region", minWidth: 50 },
  { id: "Item Type", label: "Item\nType", minWidth: 50 },
  { id: "Sales Channel", label: "Sales\nChannel", minWidth: 50 },
  { id: "Order Priority", label: "Order\nPriority", minWidth: 30 },
  {
    id: "Order Date",
    label: "Order\nDate",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Ship Date",
    label: "Ship\nDate",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Units Sold",
    label: "Units\nSold",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(0),
  },
  {
    id: "Unit Price",
    label: "Unit\nPrice",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Unit Cost",
    label: "Unit\nCost",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Total Revenue",
    label: "Total\nRevenue",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Total Cost",
    label: "Total\nCost",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Total Profit",
    label: "Total\nProfit",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const Orders = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const requestOptions = Constants.GET_JSON;
    fetch(Constants.ORDERS_SERVICE, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        props.onOrders(data);
      });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={props.orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Orders;
