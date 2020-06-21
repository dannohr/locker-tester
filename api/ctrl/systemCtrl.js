var os = require("os");

module.exports = {
  getSystemStatus: (req, res, next) => {
    var networkInterfaces = os.networkInterfaces();

    console.log(networkInterfaces);
    res.status(200).json(networkInterfaces);

    // console.log("---------- Start of Door Status Sequence ----------");
    // modbus
    //   .doorOpenStatus()
    //   .then((response) => {
    //     console.log(response);
    //     console.log("----------- End of Door Status Sequence -----------");
    //     res.status(200).json(response);
    //   })
    //   .catch((response) => {
    //     res.status(400);
    //   });
  },
};
