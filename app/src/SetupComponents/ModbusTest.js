import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./ModbusTest.css";
const ENDPOINT = "http://127.0.0.1:4001";

function ModbusTest() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("modbusStatus", (data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);

  return (
    <p className="root">
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default ModbusTest;

// import React from "react";
// import useSocket from "use-socket.io-client";
// // import Grid from "@material-ui/core/Grid";
// import "./ModbusTest.css";

// function ModbusTest() {
//   const [socket] = useSocket("http://127.0.0.1:3002");
//   //   socket.connect();

//   socket.on("connect", function (data) {
//     socket.emit("join", "Hello World from client");
//   });

//   // set up socket.on for data received from sever
//   // server trigger 'data' event when data is received from device.
//   //   socket.on("data", function (data) {
//   //     console.log("received:", data);
//   //   });

//   // ask server to get coils
//   // "Read coils" (FC=01)
//   //   socket.emit("readCoils", {
//   //     unit: 1,
//   //     address: 0,
//   //     length: 8,
//   //   });

//   return <div className="root">Modbus Test Stuff</div>;
// }

// export default ModbusTest;
