"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("./lib/server/middlewares"));

var _routes = _interopRequireDefault(require("./lib/server/routes"));

global.print = console.log;

global.printError = function () {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ['\x1b[41m'].concat(args));

  console.log("\x1b[0m");
};

var app = (0, _express["default"])();
(0, _middlewares["default"])(app);
(0, _routes["default"])(app);
app.listen(4313, function () {
  return console.log('app is running on port 4313');
});