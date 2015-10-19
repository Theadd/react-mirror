'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var mutations = {
  attributes: true,
  childList: true,
  subtree: true
};

var Replicator = (function (_Component) {
  _inherits(Replicator, _Component);

  function Replicator(props) {
    _classCallCheck(this, Replicator);

    _get(Object.getPrototypeOf(Replicator.prototype), 'constructor', this).call(this, props);
    this.state = {};
    this._ghost = null;
    this._master = null;
    this._mirrors = new Set();
    this._observing = false;
    this._keepInSync = props.keepInSync;
  }

  _createClass(Replicator, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref) {
      var children = _ref.children;

      var props = _objectWithoutProperties(_ref, ['children']);

      this._element = _react2['default'].createElement('div', props, children);
      this.update();
      return false;
    }
  }, {
    key: 'add',
    value: function add() {
      var mirror = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      mirror && (this._mirrors.add(mirror), !this._master && (this.master = mirror, 1) || this.update());
    }
  }, {
    key: 'remove',
    value: function remove() {
      var mirror = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      mirror && (this.master === mirror && (this._master = null, this._mirrors.size && (this.master = this._mirrors.values().next().value, 1)) || (this._mirrors['delete'](mirror), this.update()));
    }
  }, {
    key: 'render',
    value: function render() {

      return null;
    }
  }, {
    key: 'handleMutations',
    value: function handleMutations(target) {
      var _this = this;

      this._observer = new MutationObserver(function (records, observer) {
        return (observer.takeRecords(), observer.disconnect(), _this._observing = false, _this.update());
      });
      this._observer._target = target;
    }
  }, {
    key: 'observe',
    value: function observe(shouldObserve) {
      if (shouldObserve) {
        if (!this._observing) {
          this._observing = true;
          this._observer.observe(this._observer._target, mutations);
        } // else ... it's already observing
      } else {
          if (this._observing) {
            this._observing = false;
            this._observer.disconnect();
            this._observer.takeRecords();
          }
        }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      this._element = _react2['default'].createElement('div', props, children);
      this._imprint = document.createElement('div');
      this.handleMutations(this._imprint);
      this._master && this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      var master = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (master != null) {
        if (this._master !== master) {
          if (this._master && !this._mirrors.has(this._master)) {
            this._mirrors.add(this._master);
          }
          if (this._mirrors.has(master)) {
            master.firstChild && master.removeChild(master.firstChild);
            this._mirrors['delete'](master);
          }
          this._master = master;
        }
      }
      if (this._master != null) {
        (function () {
          !_this2._ghost && (_this2._ghost = document.createElement('div'));
          _this2._master.parentNode.appendChild(_this2._ghost);
          _this2._ghost.appendChild(_this2._imprint);
          _react2['default'].unstable_renderSubtreeIntoContainer(_this2, _this2._element, _this2._imprint);
          _this2._master.parentNode.removeChild(_this2._ghost);
          _this2._master.appendChild(_this2._ghost.firstChild);

          var node = _this2._master.firstChild;
          _this2._master.style.pointerEvents = 'all';

          _this2._mirrors.size && _this2._mirrors.forEach(function (mirror) {
            return (mirror.firstChild ? mirror.replaceChild(node.cloneNode(true), mirror.firstChild) : mirror.appendChild(node.cloneNode(true)), mirror.style.pointerEvents = 'none');
          });
        })();
      } else if (this._keepInSync) {
        _react2['default'].unstable_renderSubtreeIntoContainer(this, this._element, this._imprint);
      }
      this.observe(true);
    }
  }, {
    key: 'getDOMNode',
    value: function getDOMNode(sync) {
      return ((sync || sync == null && !this._imprint.children.length) && _react2['default'].unstable_renderSubtreeIntoContainer(this, this._element, this._imprint), this._imprint);
    }
  }, {
    key: 'master',
    get: function get() {
      return this._master;
    },
    set: function set(value) {
      value && this.update(value);
    }
  }, {
    key: 'children',
    set: function set(value) {
      if (value) {
        var _props2 = this.props;
        var children = _props2.children;

        var props = _objectWithoutProperties(_props2, ['children']);

        this._element = _react2['default'].createElement('div', props, value);
      }
    }
  }, {
    key: 'keepInSync',
    set: function set(value) {
      typeof value === 'boolean' && value !== this._keepInSync && (this._keepInSync = value, value && (!this._master && this.observe(true)));
    }
  }]);

  return Replicator;
})(_react.Component);

exports['default'] = Replicator;
module.exports = exports['default'];