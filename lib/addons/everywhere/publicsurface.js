'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _surface = require('../../surface');

var _surface2 = _interopRequireDefault(_surface);

var _collection = require('./collection');

var propTypes = {
  id: _react.PropTypes.string,
  parentId: _react.PropTypes.string
};

var contextTypes = {
  '--everywhere-parentId': _react.PropTypes.string,
  '--everywhere-prev-parentId': _react.PropTypes.any
};

var PublicSurface = (function (_Component) {
  _inherits(PublicSurface, _Component);

  function PublicSurface(props, context) {
    _classCallCheck(this, PublicSurface);

    _get(Object.getPrototypeOf(PublicSurface.prototype), 'constructor', this).call(this, props, context);
    this._params = this._getPublicParams(props, context);
  }

  _createClass(PublicSurface, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _collection.collection.set(this.refs.surface, this._params.id, this._params.parentId);
    }
  }, {
    key: '_getPublicParams',
    value: function _getPublicParams(_ref, _ref2) {
      var _ref$id = _ref.id;
      var id = _ref$id === undefined ? null : _ref$id;
      var _ref$parentId = _ref.parentId;
      var parentId = _ref$parentId === undefined ? void 0 : _ref$parentId;
      var _ref2$EverywhereParentId = _ref2['--everywhere-parentId'];

      var _parentId = _ref2$EverywhereParentId === undefined ? null : _ref2$EverywhereParentId;

      var _ref2$EverywherePrevParentId = _ref2['--everywhere-prev-parentId'];

      var _prev_parentId = _ref2$EverywherePrevParentId === undefined ? null : _ref2$EverywherePrevParentId;

      return (id != null && (parentId === void 0 && (_parentId === id && (parentId = _prev_parentId, 1) || (parentId = _parentId, 1)), 1) || parentId === void 0 && (parentId = _parentId, 1), { id: id, parentId: parentId });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var id = _props.id;
      var parentId = _props.parentId;

      var props = _objectWithoutProperties(_props, ['children', 'id', 'parentId']);

      return (0, _react.createElement)(_surface2['default'], _extends({}, props, { ref: 'surface' }), children);
    }
  }, {
    key: 'id',
    get: function get() {
      return typeof this._id === 'string' ? String(this._id) : null;
    }
  }]);

  return PublicSurface;
})(_react.Component);

PublicSurface.propTypes = propTypes;
PublicSurface.contextTypes = contextTypes;

exports.PublicSurface = PublicSurface;