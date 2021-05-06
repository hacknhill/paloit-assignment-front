import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FileDrop from "./FileDrop";
import * as Constants from "./utils/Constants";

const Upload = (props) => {
  const theme = Constants.UI_THEMES;

  const [file, setFile] = useState({});
  const [rawData, setRawData] = useState("");
  const uploadOrders = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: csvJSON(rawData).replace(/(?:\\[r])+/g, ""),
    };
    fetch(Constants.ORDERS_SERVICE, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        props.onOrders(data);
        setRawData("");
      });
  };
  function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          p={0}
          bgcolor="background.paper"
          alignItems="center"
        >
          <Box>
            <ThemeProvider theme={theme}>
              <Typography variant="h3">Upload Sales Order</Typography>
            </ThemeProvider>
          </Box>
          <Box p={3} flexGrow={1}>
            <FileDrop
              onSetFile={setFile}
              rawData={rawData}
              onRawData={setRawData}
            ></FileDrop>
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={uploadOrders}
              disabled={!rawData}
            >
              {rawData ? "Process " + file.name : "No CSV File Input "}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default Upload;
