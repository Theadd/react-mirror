
const flags = {
  CONTINUE: 0,
  MATCH: 1,
  NEXT: 2  // Skips any possible nested children of this node
}

function simpleSearchFn (pattern, instance /*, id, path*/) {
  return (instance && (instance.text || (instance.toString && instance.toString()) || '').includes(pattern)) ? flags.MATCH : flags.CONTINUE
}

function lazyWalker ({ defaultSearchFn=simpleSearchFn }) {

  let entries = new Map()
  let wayback = new Map()
  let triggers = new Map()  // [ ['id', new Set(cb, ...)], ... ]

  function * IdGeneratorFn () {
    for (let n = 0; ; n++) {
      yield 'AUTO!ID' + n
    }
  }

  let IdGenerator = IdGeneratorFn()

  const getEntryFor = (id) => {
    if (id == null) {
      return [null, entries]
    }
    return (entry => (entry.get(id) || entry.set(id, [null, new Map()]).get(id)))(getEntryFor(wayback.get(id) || null)[1])
  }

  const relocate = (fromParentId, location) => {
    for (let [id, parentId] of wayback) {
      if (parentId === fromParentId) {
        if (entries.has(id)) {
          location.set(id, entries.get(id))
          entries.delete(id)
        }
      }
    }
  }

  const LazyWalker = {
    set: function (instance, id=null, parent=null) {
      id == null && (id = IdGenerator.next().value)
      wayback.set(id, parent)
      let entry = getEntryFor(id)
      entry[0] = instance
      relocate(id, entry[1])
      triggers.has(id) && (triggers.get(id).forEach(cb => cb(id, instance)), triggers.delete(id))
    },

    get: function (id, cb) {
      if (wayback.has(id)) {
        let instance = getEntryFor(id)[0]
        if (instance) {
          return cb(id, instance)
        }
      }
      return (triggers.get(id) || triggers.set(id, new Set()).get(id)).add(cb)
    },

    search: function (pattern, searchFn=defaultSearchFn) {

      function * walk (data, path=[]) {
        let res = 0
        for (let [id, entry] of data) {
          res = searchFn(pattern, entry[0], id, path)
          if (res & flags.MATCH === flags.MATCH) {
            yield entry[0]
          }
          if (((res & flags.NEXT) !== flags.NEXT) && entry[1].size) {
            yield* walk(entry[1], [...path, id])
          }
        }
      }

      function * stepWalk () {
        for (let x of walk(entries, [])) {
          yield x
        }
      }

      let step = stepWalk()

      let Search = {
        * first (n) {
          for (let x of walk(entries, [])) {
            if (n <= 0) return
            n--
            yield x
          }
        },
        * take (n) {
          let x
          while ((--n >= 0) && !(x = step.next()).done) {
            yield x.value
          }
        },
        restart () {
          step = stepWalk()
        },
        toArray (iterator) {
          return [...iterator]
        }
      }

      return Search
    }
  }

  return LazyWalker
}

export default lazyWalker
export { flags }
