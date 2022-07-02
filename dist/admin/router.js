"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = _interopRequireDefault(require("./controller"));

var _adminAuth = _interopRequireDefault(require("../lib/utils/adminAuth"));

var router = _express["default"].Router();

router.get('/', _controller["default"].home);
router.post('/create', _controller["default"].createAdmin);
router.post('/login-step-one', _controller["default"].loginStepOne);
router.post('/login-step-two', _controller["default"].loginStepTwo);
router.get('/test', _adminAuth["default"], _controller["default"].test);
var _default = router;
exports["default"] = _default;