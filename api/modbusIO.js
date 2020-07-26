var modbusServer = require("./node_modules/modbus-ws/server");
const db = require("./models/index");

let modbusIp = db.lockerSystem
  .findAll({
    where: { active: 1 },
  })
  .then((server) => {
    // console.log(server);
    if (!server) {
      return null;
    }
    return server;
  })
  .catch((error) => console.log(error));

console.log(modbusIp);

let modbusServerOptions = {
  tcpport: 3006,
  ip: "192.168.1.83",
  test: false,
  nocache: true,
  nohttp: true,
};

module.exports.startModbusIO = () => {
  modbusServer.start(modbusServerOptions);
};
