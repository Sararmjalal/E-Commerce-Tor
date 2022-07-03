"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = adminAuth;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function decodeToken(_x) {
  return _decodeToken.apply(this, arguments);
}

function _decodeToken() {
  _decodeToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var arr;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = token.split(' ');
            _context.prev = 1;

            if (!(arr[0] === 'at')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", _jsonwebtoken["default"].verify(arr[1], 'ADMIN_SECRET'));

          case 4:
            throw new Error('Please Re-Sign In');

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            printError(_context.t0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));
  return _decodeToken.apply(this, arguments);
}

function adminAuth(_x2, _x3, _x4) {
  return _adminAuth.apply(this, arguments);
}

function _adminAuth() {
  _adminAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var token, admin;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.headers.a_auth;

            if (!(token != null)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 5;
            return decodeToken(token);

          case 5:
            admin = _context2.sent;
            print('this admin : ', admin);
            req.admin = admin;
            _context2.next = 11;
            break;

          case 10:
            req.admin = null;

          case 11:
            return _context2.abrupt("return", next());

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            req.admin = null;
            return _context2.abrupt("return", next());

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return _adminAuth.apply(this, arguments);
}