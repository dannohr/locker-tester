const express = require("express");
const bodyParser = require("body-parser");
// const startModbusIO = require("./modbusIO");

require("dotenv").config();

const app = express();
// const port = process.env.SERVER_PORT || 5000;
const routes = require("./routes");

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use(process.env.API_ENDPOINT, routes);

app.get("/api/hello", (req, res) => {
  res.send({ express: "Yep. Modbus System Connected" });
});

// startModbusIO.startModbusIO();

// app.listen(port, () => console.log(`API listening on port ${port}`));

module.exports = app;
