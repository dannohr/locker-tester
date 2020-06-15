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

function LockerSystem() {
  // doorStatusFromWago will be one big array showing status of inpurs
  // const [doorStatusFromWago, setDoorStatusFromWago] = useState([]);
  const [doorStatus, setDoorStatus] = useState();

  // useEffect(() => {
  //   console.log("refreshing");
  //   refreshInputs();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("updating");
      refreshInputs();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  var refreshInputs = () => {
    axios.get(`/api/getAllInputStatus`).then((res) => {
      // let doorStatus = chunkArray(res.data[0].doorOpen, 8);
      let doorStatusFromWago = res.data[0].doorOpen;
      // console.log(doorStatusFromWago);
      // setDoorStatusFromWago({ doorStatusFromWago });
      // console.log(doorStatusFromWago);
      // console.log(doorStatus);

      let doorStatus = setLockerSystemDoorStatus(
        doorStatusFromWago,
        systemLayout
      );
      // console.log(doorStatus);
      setDoorStatus(doorStatus);
      // console.log(doorStatusFromWago);
      // console.log(doorStatus);
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
            doorStatus={doorStatus ? doorStatus[index] : [false]}
          />
        ))}
      </Grid>
    </div>
  );
}

export default LockerSystem;

var setLockerSystemDoorStatus = (statusArr, systemLayout) => {
  // console.log(statusArr);

  let testStatus = [];
  let testColumn = [];

  // First loop is to go through the columns
  for (let i = 0; i < systemLayout.length; i++) {
    // console.log(systemLayout);
    // console.log("Locker Column", i + 1);
    // console.log(systemLayout[i]);

    // let val = array[i];
    testColumn = [];
    for (let j = 0; j < systemLayout[i].length; j++) {
      // console.log(systemLayout[i][j]);
      let position =
        8 * (systemLayout[i][j].cardID - 1) + (systemLayout[i][j].portID - 1);

      let positionStatus =
        statusArr[position] === undefined ? false : statusArr[position];
      // console.log(
      //   "looking for position ",
      //   position,
      //   "which has a status of ",
      //   positionStatus
      // );
      testColumn.push(positionStatus);
      // console.log(testColumn);
    }
    testStatus.push(testColumn);
  }
  // console.log(testStatus);
  return testStatus;
};

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

  // console.log(lockerSystem);
  return lockerSystem;
};

/**********************************************************************
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
// function chunkArray(myArray, chunk_size) {
//   var results = [];

//   while (myArray.length) {
//     results.push(myArray.splice(0, chunk_size));
//   }

//   return results;
// }

// // Split in group of 3 items
// var result = chunkArray([1,2,3,4,5,6,7,8], 3);
// // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
// console.log(result);
