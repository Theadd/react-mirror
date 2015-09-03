"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = assign;

function assign(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    Object.defineProperties(target, Object.keys(source).reduce(function (descriptors, key) {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);

      return descriptors;
    }, {}));
  });

  return target;
}

module.exports = exports["default"];