'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _surface = require('../../surface');

var _surface2 = _interopRequireDefault(_surface);

var _utilsAssign = require('../../utils/assign');

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var Reflectable = function Reflectable() {
  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (reflectable) {
    (0, _utilsAssign2['default'])(reflectable.prototype, {
      __render: reflectable.prototype.render
    }, {
      render: function render() {

        return (0, _react.createElement)(_surface2['default'], props, this.__render());
      }
    });

    return reflectable;
  };
};

exports['default'] = Reflectable;
module.exports = exports['default'];