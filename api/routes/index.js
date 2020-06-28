var express = require("express");
var router = express.Router();

const modbusServerCtrl = require("../controllers/modbusServerCtrl");
const lockModbusCtrl = require("../controllers/lockModbusCtrl.js");

// routes for modbus server
router.get("/modbus", modbusServerCtrl.list);
router.get("/modbus/:id", modbusServerCtrl.getById);
router.post("/modbus", modbusServerCtrl.add);
router.put("/modbus/:id", modbusServerCtrl.update);
router.delete("/modbus/:id", modbusServerCtrl.delete);

router.get("/activeModbusServer", modbusServerCtrl.getActiveServer);

router.get("/getAllInputStatus", lockModbusCtrl.getAllInputStatus);
router.post("/postOpenLock", lockModbusCtrl.postOpenLock);

// router.post("/login", authCtrl.login);
// router.get("/me", authCtrl.me);
// router.get("/test", (req, res) =>
//   res.json({ status: "success", message: "Welcome To API" })
// );

module.exports = router;
