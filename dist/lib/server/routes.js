"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("../../admin/router"));

var _default = function _default(app) {
  app.get('/', function (req, res, next) {
    res.send('<h1> hello <span style="color: red" >world</span> </h1>');
  });
  app.use('/admin/', _router["default"]);
};

exports["default"] = _default;