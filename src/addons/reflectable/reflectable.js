import { createElement } from 'react'
import Surface from '../../surface'
import assign from '../../utils/assign'

const Reflectable = (props={}) => {

  return (reflectable) => {
    assign(reflectable.prototype, {
      __render: reflectable.prototype.render
    }, {
      render () {

        return createElement(Surface, props, this.__render())
      }
    })

    return reflectable
  }
}

export default Reflectable
