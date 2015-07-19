'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
    this.state = {};
    this._surface = null;
  }

  _inherits(Mirror, _Component);

  _createClass(Mirror, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      // TODO: props
      return false;
    }
  }, {
    key: 'reflect',
    value: function reflect() {
      var surface = arguments[0] === undefined ? null : arguments[0];

      this._surface && this._surface.remove(this.node);
      surface && (this._surface = surface, this._surface.add(this.node));
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        { onMouseEnter: function () {
            return _this._surface && (_this._surface.active = _this.node);
          } },
        _react2['default'].createElement('div', _extends({ ref: 'node' }, this.props))
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