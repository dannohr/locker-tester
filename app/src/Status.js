import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";

export default function Status() {
  const [network, setNetwork] = useState({
    "react-json-view": "latest",
  });
  // console.log(props);
  // const layout = props.layout.split(",");
  // const layout = props.lockerColumn;
  // const doorStatus = props.doorStatus;

  useEffect(() => {
    axios
      .get(`/api/status`)
      .then((response) => {
        console.log(JSON.stringify(response.data, undefined, 2));
        // console.log(JSON.stringify(response.body, undefined, 2));
        setNetwork(response.data);
        // setCommitHistory(response.items);
        // setIsLoading(false);
        // console.log(network);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={styles.status}>
      <Typography variant="body1" style={styles.columnHeader}>
        Status of Locker Tester Status of Locker Tester Status of Locker Tester
        Status of Locker Tester
      </Typography>

      {/* <Typography variant="body1" style={styles.columnHeader}> */}

      <JSONPretty
        id="json-pretty"
        data={network}
        theme={JSONPrettyMon}
      ></JSONPretty>
      {/* </Typography> */}
    </div>
  );
}

const styles = {
  status: {
    // width: 200,
    // height: 600,
    margin: 10,
    // display: "flex",
    // flexDirection: "column",
  },
  columnHeader: {
    color: "white",
    marginBottom: "5px",
  },

  lockerDoorButton: {
    height: "100%",
    width: "100%",
  },
};
