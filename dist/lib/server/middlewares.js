"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _userAuth = _interopRequireDefault(require("../utils/userAuth"));

// import decodeToken from '../lib/decode-token'
var _default = function _default(app) {
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  app.use(_userAuth["default"]);
  app.use(_express["default"]["static"](_path["default"].join(process.cwd(), "/src/public/")));
};

exports["default"] = _default;