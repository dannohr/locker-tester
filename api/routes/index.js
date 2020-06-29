var express = require("express");
var router = express.Router();

const modbusServerCtrl = require("../controllers/modbusServerCtrl");
const lockerSystemCtrl = require("../controllers/lockerSystemCtrl");
const lockModbusCtrl = require("../controllers/lockModbusCtrl.js");

// routes for modbus server
router.get("/modbus", modbusServerCtrl.list);
router.get("/modbus/:id", modbusServerCtrl.getById);
router.post("/modbus", modbusServerCtrl.add);
router.put("/modbus/:id", modbusServerCtrl.update);
router.delete("/modbus/:id", modbusServerCtrl.delete);

router.get("/activeModbusServer", modbusServerCtrl.getActiveServer);
router.get("/activeLockerSystem", lockerSystemCtrl.getActiveServer);

router.get("/getAllInputStatus", lockModbusCtrl.getAllInputStatus);
router.post("/postOpenLock", lockModbusCtrl.postOpenLock);

router.get("/lockersystem", lockerSystemCtrl.list);
router.get("/lockersystem/:id", lockerSystemCtrl.getById);
router.post("/lockersystem", lockerSystemCtrl.add);
router.put("/lockersystem/:id", lockerSystemCtrl.update);
router.delete("/lockersystem/:id", lockerSystemCtrl.delete);

// router.post("/login", authCtrl.login);
// router.get("/me", authCtrl.me);
// router.get("/test", (req, res) =>
//   res.json({ status: "success", message: "Welcome To API" })
// );

module.exports = router;
