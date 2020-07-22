import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import "./LockerSystem.css";
import Column from "./Column";
// import axios from "axios";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3006";

var lockers = require("./lockers");

// first number is the door number kiosk is immediately after
// second number is the size of the kiosk door
var kioskLocationSize = [{ kioskAfter: 58, kioskSize: 5 }];

function LockerSystem(props) {
  // console.log(props);
  var columnDoorSpacing = 15; //props.activeLockerSystem.columnDoorSpacing;
  // console.log(columnDoorSpacing);

  const [doorStatus, setDoorStatus] = useState();
  const [ioStatus, setIoStatus] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("connect", function () {
      setIoStatus(true);
    });

    // this is what makes the polling start
    socket.emit("readDiscreteInputs", {
      unit: 1,
      address: 0,
      length: 6 * 8,
      interval: 1000,
    });

    //this is what makes the polling start
    // socket.emit("readCoils", {
    //   unit: 1,
    //   address: 0,
    //   length: 16,
    //   interval: 1000,
    // });

    //this is what gets the polling data and updates state
    socket.on("data", (data) => {
      console.log(data);

      let doorStatus = setLockerSystemDoorStatus(data.data, systemLayout);
      setDoorStatus(doorStatus);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  let systemLayout = buildSystemLayout(
    lockers,
    columnDoorSpacing,
    kioskLocationSize
  );

  return (
    <div className="App">
      {ioStatus ? <p> Connected </p> : <p> NOT CONNECTED </p>}
      {props.activeLockerSystem ? (
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
      ) : null}
    </div>
  );
}

export default LockerSystem;

var setLockerSystemDoorStatus = (statusArr, systemLayout) => {
  let testStatus = [];
  let testColumn = [];

  // First loop is to go through the columns
  for (let i = 0; i < systemLayout.length; i++) {
    testColumn = [];
    for (let j = 0; j < systemLayout[i].length; j++) {
      let position =
        8 * (systemLayout[i][j].cardID - 1) + (systemLayout[i][j].portID - 1);

      let positionStatus =
        statusArr[position] === undefined ? false : statusArr[position];

      testColumn.push(positionStatus);
    }
    testStatus.push(testColumn);
  }

  return testStatus;
};

var buildSystemLayout = (lockers, columnDoorSpacing, kioskLocationSize) => {
  let lockerSystem = [];
  let thisColumn = [];
  let lockersCount = 0;
  let totalNumOfLocketDoors = lockers.length;

  lockers.forEach((locker, index) => {
    // console.log("working on door number", locker.lockID);
    // console.log("lockersCount is", lockersCount);
    // console.log("columnDoorSpacing is", columnDoorSpacing);

    // build the individual columns.  Push next door opening into array until size limit reached
    if (lockersCount < columnDoorSpacing) {
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

    // when columnDoorSpacing is reached, put column into lockerSystem and start over
    if (
      lockersCount >= columnDoorSpacing ||
      index === totalNumOfLocketDoors - 1
    ) {
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
