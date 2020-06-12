import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import "./LockerSystem.css";
import Column from "./Column";
import axios from "axios";

var lockers = require("./lockers");
var numPerColumn = 15;

// first number is the door number kiosk is immediately after
// second number is the size of the kiosk door
var kioskLocationSize = [{ kioskAfter: 58, kioskSize: 5 }];

var buildSystemLayout = (lockers, numPerColumn, kioskLocationSize) => {
  let lockerSystem = [];
  let thisColumn = [];
  let lockersCount = 0;
  let totalNumOfLocketDoors = lockers.length;

  lockers.forEach((locker, index) => {
    // console.log("working on door number", locker.lockID);
    // console.log("lockersCount is", lockersCount);
    // console.log("numPerColumn is", numPerColumn);

    // build the individual columns.  Push next door opening into array until size limit reached
    if (lockersCount < numPerColumn) {
      // console.log("pushing", locker, "into column");
      thisColumn.push(locker);

      let obj = kioskLocationSize.find((x) => x.kioskAfter === locker.lockID);

      if (obj) {
        // console.log("=====================");
        // console.log("next is kiosk");
        // console.log("=====================");
        thisColumn.push({
          cardID: null,
          lockID: "Kiosk",
          portID: null,
          sizeID: obj.kioskSize,
        });
        lockersCount = lockersCount + obj.kioskSize;
      }
    }

    lockersCount += locker.sizeID;

    // when numPerColumn is reached, put column into lockerSystem and start over
    if (lockersCount >= numPerColumn || index === totalNumOfLocketDoors - 1) {
      lockerSystem.push(thisColumn);

      // reset locker variables to start building the next column
      lockersCount = 0;
      thisColumn = [];
    }
  });

  return lockerSystem;
};

function LockerSystem() {
  const [doorStatus, setDoorStatus] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    refreshInputs();
  }, []);

  var refreshInputs = () => {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then((res) => {
      let doorStatus = chunkArray(res.data[0].doorOpen, 8);

      setDoorStatus({ doorStatus });
      console.log(doorStatus);
    });
  };

  let systemLayout = buildSystemLayout(
    lockers,
    numPerColumn,
    kioskLocationSize
  );

  return (
    <div className="App">
      <Grid container>
        {systemLayout.map((lockerColumn, index) => (
          <Column
            key={index}
            lockerColumn={lockerColumn}
            columnNum={index + 1}
            doorStatus={doorStatus[index]}
          />
        ))}
      </Grid>
    </div>
  );
}

export default LockerSystem;

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

// // Split in group of 3 items
// var result = chunkArray([1,2,3,4,5,6,7,8], 3);
// // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
// console.log(result);
