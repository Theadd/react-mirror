'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var flags = {
  CONTINUE: 0,
  MATCH: 1,
  NEXT: 2 // Skips any possible nested children of this node
};

function simpleSearchFn(pattern, instance /*, id, path*/) {
  return instance && (instance.text || instance.toString && instance.toString() || '').includes(pattern) ? flags.MATCH : flags.CONTINUE;
}

function lazyWalker(_ref) {
  var marked1$0 = [IdGeneratorFn].map(regeneratorRuntime.mark);
  var _ref$defaultSearchFn = _ref.defaultSearchFn;
  var defaultSearchFn = _ref$defaultSearchFn === undefined ? simpleSearchFn : _ref$defaultSearchFn;

  var entries = new Map();
  var wayback = new Map();
  var triggers = new Map(); // [ ['id', new Set(cb, ...)], ... ]

  function IdGeneratorFn() {
    var n;
    return regeneratorRuntime.wrap(function IdGeneratorFn$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          n = 0;

        case 1:
          context$2$0.next = 3;
          return 'AUTO!ID' + n;

        case 3:
          n++;
          context$2$0.next = 1;
          break;

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, marked1$0[0], this);
  }

  var IdGenerator = IdGeneratorFn();

  var getEntryFor = function getEntryFor(id) {
    if (id == null) {
      return [null, entries];
    }
    return (function (entry) {
      return entry.get(id) || entry.set(id, [null, new Map()]).get(id);
    })(getEntryFor(wayback.get(id) || null)[1]);
  };

  var relocate = function relocate(fromParentId, location) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = wayback[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var id = _step$value[0];
        var parentId = _step$value[1];

        if (parentId === fromParentId) {
          if (entries.has(id)) {
            location.set(id, entries.get(id));
            entries['delete'](id);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var LazyWalker = {
    set: function set(instance) {
      var id = arguments[1] === undefined ? null : arguments[1];
      var parent = arguments[2] === undefined ? null : arguments[2];

      id == null && (id = IdGenerator.next().value);
      wayback.set(id, parent);
      var entry = getEntryFor(id);
      entry[0] = instance;
      relocate(id, entry[1]);
      triggers.has(id) && (triggers.get(id).forEach(function (cb) {
        return cb(id, instance);
      }), triggers['delete'](id));
    },

    get: function get(id, cb) {
      if (wayback.has(id)) {
        var instance = getEntryFor(id)[0];
        if (instance) {
          return cb(id, instance);
        }
      }
      return (triggers.get(id) || triggers.set(id, new Set()).get(id)).add(cb);
    },

    search: function search(pattern) {
      var marked2$0 = [walk, stepWalk].map(regeneratorRuntime.mark);
      var searchFn = arguments[1] === undefined ? defaultSearchFn : arguments[1];

      function walk(data) {
        var path = arguments[1] === undefined ? [] : arguments[1];

        var res, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, id, entry;

        return regeneratorRuntime.wrap(function walk$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              res = 0;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$3$0.prev = 4;
              _iterator2 = data[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$3$0.next = 19;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2);
              id = _step2$value[0];
              entry = _step2$value[1];

              res = searchFn(pattern, entry[0], id, path);

              if (!(res & flags.MATCH === flags.MATCH)) {
                context$3$0.next = 14;
                break;
              }

              context$3$0.next = 14;
              return entry[0];

            case 14:
              if (!((res & flags.NEXT) !== flags.NEXT && entry[1].size)) {
                context$3$0.next = 16;
                break;
              }

              return context$3$0.delegateYield(walk(entry[1], [].concat(_toConsumableArray(path), [id])), 't0', 16);

            case 16:
              _iteratorNormalCompletion2 = true;
              context$3$0.next = 6;
              break;

            case 19:
              context$3$0.next = 25;
              break;

            case 21:
              context$3$0.prev = 21;
              context$3$0.t1 = context$3$0['catch'](4);
              _didIteratorError2 = true;
              _iteratorError2 = context$3$0.t1;

            case 25:
              context$3$0.prev = 25;
              context$3$0.prev = 26;

              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }

            case 28:
              context$3$0.prev = 28;

              if (!_didIteratorError2) {
                context$3$0.next = 31;
                break;
              }

              throw _iteratorError2;

            case 31:
              return context$3$0.finish(28);

            case 32:
              return context$3$0.finish(25);

            case 33:
            case 'end':
              return context$3$0.stop();
          }
        }, marked2$0[0], this, [[4, 21, 25, 33], [26,, 28, 32]]);
      }

      function stepWalk() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, x;

        return regeneratorRuntime.wrap(function stepWalk$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              context$3$0.prev = 3;
              _iterator3 = walk(entries, [])[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                context$3$0.next = 12;
                break;
              }

              x = _step3.value;
              context$3$0.next = 9;
              return x;

            case 9:
              _iteratorNormalCompletion3 = true;
              context$3$0.next = 5;
              break;

            case 12:
              context$3$0.next = 18;
              break;

            case 14:
              context$3$0.prev = 14;
              context$3$0.t0 = context$3$0['catch'](3);
              _didIteratorError3 = true;
              _iteratorError3 = context$3$0.t0;

            case 18:
              context$3$0.prev = 18;
              context$3$0.prev = 19;

              if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
              }

            case 21:
              context$3$0.prev = 21;

              if (!_didIteratorError3) {
                context$3$0.next = 24;
                break;
              }

              throw _iteratorError3;

            case 24:
              return context$3$0.finish(21);

            case 25:
              return context$3$0.finish(18);

            case 26:
            case 'end':
              return context$3$0.stop();
          }
        }, marked2$0[1], this, [[3, 14, 18, 26], [19,, 21, 25]]);
      }

      var step = stepWalk();

      var Search = {
        first: regeneratorRuntime.mark(function first(n) {
          var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, x;

          return regeneratorRuntime.wrap(function first$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                context$3$0.prev = 3;
                _iterator4 = walk(entries, [])[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  context$3$0.next = 15;
                  break;
                }

                x = _step4.value;

                if (!(n <= 0)) {
                  context$3$0.next = 9;
                  break;
                }

                return context$3$0.abrupt('return');

              case 9:
                n--;
                context$3$0.next = 12;
                return x;

              case 12:
                _iteratorNormalCompletion4 = true;
                context$3$0.next = 5;
                break;

              case 15:
                context$3$0.next = 21;
                break;

              case 17:
                context$3$0.prev = 17;
                context$3$0.t0 = context$3$0['catch'](3);
                _didIteratorError4 = true;
                _iteratorError4 = context$3$0.t0;

              case 21:
                context$3$0.prev = 21;
                context$3$0.prev = 22;

                if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                  _iterator4['return']();
                }

              case 24:
                context$3$0.prev = 24;

                if (!_didIteratorError4) {
                  context$3$0.next = 27;
                  break;
                }

                throw _iteratorError4;

              case 27:
                return context$3$0.finish(24);

              case 28:
                return context$3$0.finish(21);

              case 29:
              case 'end':
                return context$3$0.stop();
            }
          }, first, this, [[3, 17, 21, 29], [22,, 24, 28]]);
        }),
        take: regeneratorRuntime.mark(function take(n) {
          var x;
          return regeneratorRuntime.wrap(function take$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                x = undefined;

              case 1:
                if (!(--n >= 0 && !(x = step.next()).done)) {
                  context$3$0.next = 6;
                  break;
                }

                context$3$0.next = 4;
                return x.value;

              case 4:
                context$3$0.next = 1;
                break;

              case 6:
              case 'end':
                return context$3$0.stop();
            }
          }, take, this);
        }),
        restart: function restart() {
          step = stepWalk();
        },
        toArray: function toArray(iterator) {
          return [].concat(_toConsumableArray(iterator));
        }
      };

      return Search;
    }
  };

  return LazyWalker;
}

exports['default'] = lazyWalker;
exports.flags = flags;