"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validatePhoneNumber;

function validatePhoneNumber(value) {
  if (value.length > 13) throw new Error("Provided value is not a valid Phone Number");
  var re = /^(\+98|0|0098)?9\d{9}$/;
  var isValid = re.test(String(value));
  if (isValid) return "+98".concat(value.slice(value.length - 10, value.length));
  throw new Error("Provided value is not a valid Phone Number");
}