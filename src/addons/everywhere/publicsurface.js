import { Component, createElement, PropTypes } from 'react'
import Surface from '../../surface'
import { collection } from './collection'

const propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string
}

const contextTypes = {
  '--everywhere-parentId': PropTypes.string,
  '--everywhere-prev-parentId': PropTypes.any
}

class PublicSurface extends Component {
  constructor (props, context) {
    super(props, context)
    this._params = this._getPublicParams(props, context)
  }

  componentDidMount () {
    collection.set(this.refs.surface, this._params.id, this._params.parentId)
  }

  get id () {
    return typeof this._id === 'string' ? String(this._id) : null
  }

  _getPublicParams ({ id = null, parentId = void 0 }, { [`--everywhere-parentId`]: _parentId = null, [`--everywhere-prev-parentId`]: _prev_parentId = null }) {
    return ((id != null && (parentId === void 0 && (
      _parentId === id && (
        parentId = _prev_parentId, 1
      ) || (
        parentId = _parentId, 1
      )
    ), 1) || (
      parentId === void 0 && (parentId = _parentId, 1)
    )), { id, parentId })
  }

  render () {
    const { children, id, parentId, ...props } = this.props

    return createElement(Surface, { ...props, ref: 'surface' }, children)
  }
}

PublicSurface.propTypes = propTypes
PublicSurface.contextTypes = contextTypes

export { PublicSurface }
