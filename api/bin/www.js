#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("../app");
const debug = require("debug")("backend:server");
const http = require("http");
const models = require("../models");
const startModbusIO = require("../modbusIO");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

// INSTEAD OF USING THIS BELOW, I'M USING startModbusIO.startModbusIO();
// BUT THIS STARTS MODBUS ON A DIFFERENT PORT THAN THE API.
// NOT SURE IF THAT MATTERS - IT'S WORKING SO I'M NOT GOING TO WORRY ABOUT IT
//
//
startModbusIO.startModbusIO();

// const io = require("socket.io")(server);

// io.on("connection", (socket) => {
//   socket.on("join", async (room) => {
//     socket.join(room);
//     io.emit("roomJoined", room);
//   });

//   socket.on("message", async (data) => {
//     const { chatRoomName, author, message } = data;
//     const chatRoom = await models.ChatRoom.findAll({
//       where: { name: chatRoomName },
//     });
//     const chatRoomId = chatRoom[0].id;

//     try {
//       const chatMessage = await models.ChatMessage.create({
//         chatRoomId,
//         author,
//         message: message,
//       });

//       io.emit("newMessage", chatMessage);
//     } catch (err) {
//       // print the error details
//       console.log(err);
//     }
//   });
// });

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
server.listen(port, () => console.log(`API listening on port ${port}`));
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
