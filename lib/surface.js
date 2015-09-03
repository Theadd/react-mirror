'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _replicator = require('./replicator');

var _replicator2 = _interopRequireDefault(_replicator);

var _mirror = require('./mirror');

var _mirror2 = _interopRequireDefault(_mirror);

var displayName = 'Surface';
var propTypes = {
  children: _react.PropTypes.element.isRequired,
  initialMirror: _react.PropTypes.bool,
  equalityTest: _react.PropTypes.any,
  keepInSync: _react.PropTypes.bool
};
var defaultProps = {
  initialMirror: true,
  equalityTest: true,
  keepInSync: false
};

var Surface = (function (_Component) {
  function Surface(props) {
    _classCallCheck(this, Surface);

    _get(Object.getPrototypeOf(Surface.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _inherits(Surface, _Component);

  _createClass(Surface, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref) {
      var equalityTest = _ref.equalityTest;
      var keepInSync = _ref.keepInSync;
      var children = _ref.children;

      var equal = typeof equalityTest === 'function' ? equalityTest(_react2['default'].Children.only(this.props.children).props, _react2['default'].Children.only(children).props) : equalityTest;

      !equal && (this.update(children, keepInSync === this.props.keepInSync ? null : keepInSync), 1) || keepInSync !== this.props.keepInSync && (this.refs.repl.keepInSync = keepInSync);
      return false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var initialMirror = this.props.initialMirror;

      initialMirror && (this.refs.prime.reflect(this), this.active = this.refs.prime.node);
    }
  }, {
    key: 'add',
    value: function add(mirror) {
      this.refs.repl.add(_react2['default'].findDOMNode(mirror));
    }
  }, {
    key: 'remove',
    value: function remove(mirror) {
      this.refs.repl.remove(_react2['default'].findDOMNode(mirror));
    }
  }, {
    key: 'update',
    value: function update() {
      var children = arguments[0] === undefined ? null : arguments[0];
      var keepInSync = arguments[1] === undefined ? null : arguments[1];

      children && (this.refs.repl.children = children);
      keepInSync != null && (this.refs.repl.keepInSync = keepInSync);
      this.refs.repl.update();
    }
  }, {
    key: 'getDOMNode',

    /**
     *
     * @param {?boolean} [sync=null] - If true, it will internally render the controlled component in advance. If unspecified, it only syncs if it was never rendered before. If set to false it just returns that node.
     * @returns {DOMNode}
     */
    value: function getDOMNode() {
      var sync = arguments[0] === undefined ? null : arguments[0];

      return this.refs.repl.getDOMNode(sync);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var equalityTest = _props.equalityTest;
      var initialMirror = _props.initialMirror;

      var props = _objectWithoutProperties(_props, ['children', 'equalityTest', 'initialMirror']);

      return _react2['default'].createElement(
        'div',
        null,
        initialMirror ? _react2['default'].createElement(_mirror2['default'], { ref: 'prime' }) : null,
        _react2['default'].createElement(
          _replicator2['default'],
          _extends({ ref: 'repl' }, props),
          children
        )
      );
    }
  }, {
    key: 'active',
    get: function get() {
      return this.refs ? this.refs.repl.master : null;
    },
    set: function set(mirror) {
      mirror && (this.refs.repl.master = _react2['default'].findDOMNode(mirror));
    }
  }]);

  return Surface;
})(_react.Component);

Surface.displayName = displayName;
Surface.propTypes = propTypes;
Surface.defaultProps = defaultProps;

exports['default'] = Surface;
module.exports = exports['default'];