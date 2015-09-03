import React, { Component, PropTypes } from 'react'

class SurfaceGroup extends Component {
  static displayName = 'SurfaceGroup'

  constructor (props, context) {
    super(props, context)
    this._parentId = (typeof props.parentId === 'string' && props.parentId.length) ? props.parentId : (
      context['--everywhere-parentId'] || null
    )
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string
  }

  static childContextTypes = {
    '--everywhere-parentId': PropTypes.string,
    '--everywhere-prev-parentId': PropTypes.string
  }

  static contextTypes = {
    '--everywhere-parentId': PropTypes.string
  }

  getChildContext () {
    return {
      '--everywhere-parentId': this.props.id,
      '--everywhere-prev-parentId': this._parentId
    }
  }

  render () {
    const { children, id, parentId='', ...props } = this.props

    return React.createElement('div', props, children)
  }
}

export { SurfaceGroup }
