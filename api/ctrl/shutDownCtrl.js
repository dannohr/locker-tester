// Require child_process
var exec = require("child_process").exec;

// Create shutdown function
function shutdown(callback) {
  exec("shutdown now", function (error, stdout, stderr) {
    callback(stdout);
  });
}

// Create reboot function
function reboot(callback) {
  exec("shutdown -r now", function (error, stdout, stderr) {
    callback(stdout);
  });
}

// // Reboot computer
// reboot(function (output) {
//   console.log(output);
// });

module.exports = {
  shutDownComputer: (req, res, next) => {
    // Shutdoen computer
    shutdown(function (output) {
      console.log(output);
    });
  },
  rebootComputer: (req, res, next) => {
    // Shutdoen computer
    reboot(function (output) {
      console.log(output);
    });
  },
};
