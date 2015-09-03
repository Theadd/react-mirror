'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var displayName = 'Mirror';
var propTypes = {};

var Mirror = (function (_Component) {
  function Mirror(props) {
    _classCallCheck(this, Mirror);

    _get(Object.getPrototypeOf(Mirror.prototype), 'constructor', this).call(this, props);
    this._surface = null;
    this.state = {};
  }

  _inherits(Mirror, _Component);

  _createClass(Mirror, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {

      return false;
    }
  }, {
    key: 'reflect',
    value: function reflect() {
      var _this = this;

      var surface = arguments[0] === undefined ? null : arguments[0];

      if (surface !== this._surface) {
        this._surface && this._surface.remove(this.node);

        var node = _react2['default'].findDOMNode(this.node);
        while (node.firstChild) node.removeChild(node.firstChild);

        this._surface = surface;
        surface && this._surface.add(this.node);

        this.forceUpdate(function () {
          return _this._surface && _this._surface.update();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var _props$children = _props.children;
      var children = _props$children === undefined ? null : _props$children;

      var props = _objectWithoutProperties(_props, ['children']);

      return _react2['default'].createElement(
        'div',
        { onMouseEnter: function () {
            return _this2._surface && (_this2._surface.active = _this2.node);
          } },
        _react2['default'].createElement('div', _extends({ ref: 'node' }, props))
      );
    }
  }, {
    key: 'node',
    get: function get() {
      return this.refs ? this.refs.node : null;
    },
    set: function set(value) {}
  }]);

  return Mirror;
})(_react.Component);

Mirror.displayName = displayName;
Mirror.propTypes = propTypes;

exports['default'] = Mirror;
module.exports = exports['default'];