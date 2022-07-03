"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("./model"));

var _validatePhoneNumber = _interopRequireDefault(require("../lib/utils/validatePhoneNumber"));

var _default = {
  home: function home(req, res) {
    res.send('<h1> hello from admin </h1>');
  },
  createAdmin: function () {
    var _createAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var validPhone;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              print(req.body);
              _context.prev = 1;

              if (!(!req.body.phone || !req.body.name)) {
                _context.next = 4;
                break;
              }

              throw new Error('bad input');

            case 4:
              validPhone = (0, _validatePhoneNumber["default"])(req.body.phone);
              _context.next = 7;
              return _model["default"].create({
                name: req.body.name,
                phone: validPhone
              });

            case 7:
              return _context.abrupt("return", res.json({
                msg: 'successfully created this admin, yeay!'
              }));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              res.status(500).json({
                msg: _context.t0.message
              });

            case 13:
              res.send('ok');

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10]]);
    }));

    function createAdmin(_x, _x2) {
      return _createAdmin.apply(this, arguments);
    }

    return createAdmin;
  }(),
  loginStepOne: function () {
    var _loginStepOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _model["default"].generateAuthObject(req.body.phone);

            case 3:
              return _context2.abrupt("return", res.json({
                msg: 'ok'
              }));

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json({
                msg: _context2.t0.message
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    function loginStepOne(_x3, _x4) {
      return _loginStepOne.apply(this, arguments);
    }

    return loginStepOne;
  }(),
  loginStepTwo: function () {
    var _loginStepTwo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var thisAdmin, token;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _model["default"].checkAuthCode({
                phone: req.body.phone,
                code: req.body.code
              });

            case 3:
              thisAdmin = _context3.sent;
              token = _model["default"].createToken(thisAdmin._id);
              return _context3.abrupt("return", res.json({
                token: token
              }));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                msg: _context3.t0.message
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    function loginStepTwo(_x5, _x6) {
      return _loginStepTwo.apply(this, arguments);
    }

    return loginStepTwo;
  }(),
  test: function () {
    var _test = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var thisAdmin;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _model["default"].authorizeAdmin(req.admin);

            case 3:
              thisAdmin = _context4.sent;
              return _context4.abrupt("return", res.json(['hello world', 'salam jahan']));

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json({
                msg: _context4.t0.message
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function test(_x7, _x8) {
      return _test.apply(this, arguments);
    }

    return test;
  }()
};
exports["default"] = _default;