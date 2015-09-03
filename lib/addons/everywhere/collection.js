'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lazywalker = require('./lazywalker');

var _lazywalker2 = _interopRequireDefault(_lazywalker);

function defaultSearchFn(pattern, instance) {
  return instance && (!instance.text && (instance.text = instance.getDOMNode().textContent), instance.text.toLowerCase()).includes(String(pattern).toLowerCase()) ? _lazywalker.flags.MATCH : _lazywalker.flags.CONTINUE;
}

var collection = (0, _lazywalker2['default'])({ defaultSearchFn: defaultSearchFn });

exports.collection = collection;