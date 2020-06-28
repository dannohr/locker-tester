const modbus = require("../modbusClient.js");

module.exports = {
  getAllInputStatus: (req, res, next) => {
    console.log("---------- Start of Door Status Sequence ----------");
    modbus
      .doorOpenStatus()
      .then((response) => {
        console.log(response);
        console.log("----------- End of Door Status Sequence -----------");
        res.status(200).json(response);
      })
      .catch((response) => {
        res.status(400);
      });
  },

  postOpenLock: (req, res, next) => {
    // console.log(req);
    modbus
      .openDoors(req.body.lock, req.body.attempts)
      .then((response) => {
        console.log("---------- Start of Lock Open Sequence ----------");
        console.log(response);
        console.log("----------- End of Lock Open Sequence -----------");
        res.status(201).json(response);
      })
      .catch((response) => {
        res.status(400);
      });
  },
};
