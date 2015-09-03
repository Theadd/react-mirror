import lazyWalker, { flags } from './lazywalker'

function defaultSearchFn (pattern, instance) {
  return (
    instance && (
      !instance.text && (instance.text = instance.getDOMNode().textContent),
      instance.text.toLowerCase()
    ).includes(String(pattern).toLowerCase())
  ) ? flags.MATCH : flags.CONTINUE
}

const collection = lazyWalker({ defaultSearchFn })

export { collection }
