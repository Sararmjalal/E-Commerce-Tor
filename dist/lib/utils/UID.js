"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(str) {
  return "".concat(str, "-").concat(new Date().getTime()).concat(String(Math.random()).slice(3, 8));
};

exports["default"] = _default;