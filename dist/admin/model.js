"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _UID = _interopRequireDefault(require("../lib/utils/UID"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _validatePhoneNumber = _interopRequireDefault(require("../lib/utils/validatePhoneNumber"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var dbDirectory = _path["default"].join(process.cwd(), '/src/admin/db');

if (!(0, _fs.existsSync)(dbDirectory)) {
  (0, _fs.mkdirSync)(dbDirectory);
}

var AdminSchema = /*#__PURE__*/function () {
  function AdminSchema() {
    (0, _classCallCheck2["default"])(this, AdminSchema);
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  (0, _createClass2["default"])(AdminSchema, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var allAdmins, doesExist, thisAdmin;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!data || !data.name || !data.phone)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('bad input');

              case 2:
                _context.next = 4;
                return this.findAll();

              case 4:
                allAdmins = _context.sent;
                doesExist = allAdmins.some(function (_ref) {
                  var phone = _ref.phone;
                  return phone == data.phone;
                });

                if (!doesExist) {
                  _context.next = 8;
                  break;
                }

                throw new Error('bad request: this phonenumber already exists in the database');

              case 8:
                thisAdmin = _objectSpread(_objectSpread({
                  _id: (0, _UID["default"])('ECA')
                }, data), {}, {
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }); // path                                         // mohtawa                // options

                (0, _fs.writeFileSync)(_path["default"].join(dbDirectory, "".concat(thisAdmin._id, ".txt")), JSON.stringify(thisAdmin), "utf8");
                this.doesCacheneedsUpdate = true;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(!this.doesCacheneedsUpdate && this.cache)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", this.cache);

              case 3:
                result = (0, _fs.readdirSync)(dbDirectory).map(function (item) {
                  var thisAdmin = JSON.parse((0, _fs.readFileSync)(_path["default"].join(dbDirectory, item), {
                    encoding: "utf8"
                  }));
                  return thisAdmin;
                }); // const result = JSON.parse(y);

                this.cache = result;
                this.doesCacheneedsUpdate = false;
                return _context2.abrupt("return", result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.log('error in find all');
                console.log(_context2.t0);
                return _context2.abrupt("return", []);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id) {
        var thisAdmin;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                thisAdmin = JSON.parse((0, _fs.readFileSync)(_path["default"].join(dbDirectory, "".concat(_id, ".txt")), {
                  encoding: "utf8"
                }));
                return _context3.abrupt("return", thisAdmin);

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", null);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 5]]);
      }));

      function findById(_x2) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "findByPhone",
    value: function () {
      var _findByPhone = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(phone) {
        var validPhone, allAdmins, thisAdmin;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                validPhone = (0, _validatePhoneNumber["default"])(phone);
                _context4.next = 3;
                return this.findAll();

              case 3:
                allAdmins = _context4.sent;
                thisAdmin = allAdmins.find(function (admin) {
                  return admin.phone == validPhone;
                });

                if (thisAdmin) {
                  _context4.next = 7;
                  break;
                }

                throw new Error('bad request: no such admin exists in our database');

              case 7:
                return _context4.abrupt("return", thisAdmin);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findByPhone(_x3) {
        return _findByPhone.apply(this, arguments);
      }

      return findByPhone;
    }()
  }, {
    key: "findByIdAndUpdate",
    value: function () {
      var _findByIdAndUpdate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_id, _ref2) {
        var name, authObj, thisAdmin;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                name = _ref2.name, authObj = _ref2.authObj;
                _context5.prev = 1;
                _context5.next = 4;
                return this.findById(_id);

              case 4:
                thisAdmin = _context5.sent;

                if (thisAdmin) {
                  _context5.next = 7;
                  break;
                }

                throw new Error('bad request: no such admin found');

              case 7:
                if (name) {
                  thisAdmin.name = name;
                }

                if (authObj) {
                  thisAdmin.authObj = authObj;
                }

                thisAdmin.updatedAt = new Date().toISOString();
                (0, _fs.writeFileSync)(_path["default"].join(dbDirectory, "".concat(thisAdmin._id, ".txt")), JSON.stringify(thisAdmin), "utf8");
                this.doesCacheneedsUpdate = true;
                return _context5.abrupt("return", 'ok');

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 15]]);
      }));

      function findByIdAndUpdate(_x4, _x5) {
        return _findByIdAndUpdate.apply(this, arguments);
      }

      return findByIdAndUpdate;
    }()
  }, {
    key: "createToken",
    value: function createToken(_id) {
      return _jsonwebtoken["default"].sign({
        _id: _id
      }, 'ADMIN_SECRET');
    }
  }, {
    key: "generateAuthObject",
    value: function () {
      var _generateAuthObject = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(phone) {
        var thisAdmin, authObj;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.findByPhone(phone);

              case 2:
                thisAdmin = _context6.sent;

                if (thisAdmin) {
                  _context6.next = 5;
                  break;
                }

                throw new Error('bad request: no such admin exists in our database');

              case 5:
                authObj = {
                  code: '1111',
                  date: new Date().toISOString()
                };
                _context6.next = 8;
                return this.findByIdAndUpdate(thisAdmin._id, {
                  authObj: authObj
                });

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function generateAuthObject(_x6) {
        return _generateAuthObject.apply(this, arguments);
      }

      return generateAuthObject;
    }()
  }, {
    key: "checkAuthCode",
    value: function () {
      var _checkAuthCode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref3) {
        var phone, code, thisAdmin;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                phone = _ref3.phone, code = _ref3.code;
                _context7.next = 3;
                return this.findByPhone(phone);

              case 3:
                thisAdmin = _context7.sent;

                if (thisAdmin) {
                  _context7.next = 6;
                  break;
                }

                throw new Error('bad request: no such admin exists in our database');

              case 6:
                if (!(code !== thisAdmin.authObj.code)) {
                  _context7.next = 8;
                  break;
                }

                throw new Error('wrong code');

              case 8:
                if (!(new Date().getTime() - new Date(thisAdmin.authObj.date).getTime > 200000)) {
                  _context7.next = 10;
                  break;
                }

                throw new Error("time's up");

              case 10:
                return _context7.abrupt("return", thisAdmin);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function checkAuthCode(_x7) {
        return _checkAuthCode.apply(this, arguments);
      }

      return checkAuthCode;
    }()
  }, {
    key: "authorizeAdmin",
    value: function () {
      var _authorizeAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(admin) {
        var thisAdmin;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!admin || !admin._id)) {
                  _context8.next = 2;
                  break;
                }

                throw new Error('unathorized');

              case 2:
                _context8.next = 4;
                return this.findById(admin._id);

              case 4:
                thisAdmin = _context8.sent;

                if (thisAdmin) {
                  _context8.next = 7;
                  break;
                }

                throw new Error('unathorized');

              case 7:
                return _context8.abrupt("return", thisAdmin);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function authorizeAdmin(_x8) {
        return _authorizeAdmin.apply(this, arguments);
      }

      return authorizeAdmin;
    }()
  }]);
  return AdminSchema;
}();

var AdminModel = new AdminSchema();
var _default = AdminModel;
exports["default"] = _default;