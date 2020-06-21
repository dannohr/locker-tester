import React from "react";
// import axios from "axios";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";

export default function Status(props, style) {
  // console.log(props);
  // const layout = props.layout.split(",");
  // const layout = props.lockerColumn;
  // const doorStatus = props.doorStatus;

  return (
    <div style={styles.lockerOutline}>
      <Typography variant="body1" style={styles.columnHeader}>
        Status of Locker Tester
      </Typography>
    </div>
  );
}

const styles = {
  lockerOutline: {
    width: 200,
    // height: 600,
    margin: 10,
    display: "flex",
    flexDirection: "column",
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
