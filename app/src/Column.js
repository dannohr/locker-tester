import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// import { sizing } from "@material-ui/system";
import "./Column.css";

function Column(props, style) {
  // console.log(props);
  // const layout = props.layout.split(",");
  const layout = props.lockerColumn;
  const doorStatus = props.doorStatus;
  // console.log(doorStatus);

  return (
    <div style={styles.lockerOutline}>
      <Typography variant="body1" style={styles.columnHeader}>
        {props.columnNum}
      </Typography>

      {layout.map((h, index) => {
        // console.log(h);
        // console.log(index);
        // console.log(doorStatus[index] ? doorStatus[index] : false);
        let thisDoorStatus = doorStatus[index] ? doorStatus[index] : false;
        console.log(thisDoorStatus);
        return (
          <div
            // this class is what turns the doors green when open

            className={`${thisDoorStatus ? "door-open" : ""}`}
            key={index}
            style={styles["_" + h.sizeID]}
          >
            <Button
              name={h.lockID}
              style={styles.lockerDoorButton}
              onClick={() => {
                openLocker(h.lockID);
              }}
            >
              <Grid container justify="space-between">
                <Typography variant="subtitle2" align="left">
                  {h.cardID}
                </Typography>
                <Typography variant="h6" align="center">
                  {h.lockID}
                </Typography>
                <Typography variant="subtitle2" align="right">
                  {h.portID}
                </Typography>
              </Grid>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

var openLocker = (num) => {
  console.log("Opening Door", num);

  let toOpen = [];
  if (!Array.isArray(num)) {
    toOpen.push(num - 1);
  } else {
    toOpen = num;
  }
  axios
    .post(`/api/postOpenLock`, {
      lock: toOpen,
      attempts: 1,
    })
    .then((res) => {
      // this.updateColors(res);
      console.log(res);
      // props.setDoorOpenStatus(res.data);
    });
};

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
  _1: {
    background: "#A9A9A9",
    // flexGrow: 1,
    height: "40px",
    // border: "3px solid #888888",
    outline: "5px solid #888888",
    // outlineOffset: "-5px",
    // outlineOffset: "-6px",
  },
  _2: {
    background: "#A9A9A9",
    // flexGrow: 2,
    height: "80px",
    outline: "5px solid #888888",
    // border: "3px solid #888888",
    // outline: "2px solid #888888",
  },
  _3: {
    background: "deepskyblue",
    flexGrow: 3,
    border: "3px solid #888888",
  },
  _4: {
    background: "#A9A9A9",
    height: "160px",
    outline: "5px solid #888888",
    // flexGrow: 4,
    // border: "3px solid #888888",
    // outline: "2px solid #888888",
  },
  _5: {
    background: "deepskyblue",
    flexGrow: 5,
    border: "3px solid #888888",
  },
  _6: {
    background: "deepskyblue",
    flexGrow: 6,
    border: "3px solid #888888",
  },
  _7: {
    background: "deepskyblue",
    flexGrow: 7,
    border: "3px solid #888888",
  },
  _8: {
    background: "deepskyblue",
    flexGrow: 8,
    border: "3px solid #888888",
  },
  _9: {
    background: "deepskyblue",
    flexGrow: 9,
    border: "3px solid #888888",
  },
  _10: {
    background: "deepskyblue",
    flexGrow: 10,
    border: "3px solid #888888",
  },
  _11: {
    background: "deepskyblue",
    flexGrow: 11,
    border: "3px solid #888888",
  },
  _12: {
    background: "deepskyblue",
    flexGrow: 12,
    border: "3px solid #888888",
  },
  _13: {
    background: "deepskyblue",
    flexGrow: 13,
    border: "3px solid #888888",
  },
  _14: {
    background: "deepskyblue",
    flexGrow: 14,
    border: "3px solid #888888",
  },
  _15: {
    background: "deepskyblue",
    flexGrow: 15,
    border: "3px solid #888888",
  },
};

export default Column;
