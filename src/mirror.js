import React, { Component } from 'react'

const displayName = 'Mirror'
const propTypes = {}

class Mirror extends Component {

  constructor (props) {
    super(props)
    this.state = {}
    this._surface = null
  }

  shouldComponentUpdate () {
    // TODO: props
    return false
  }

  get node () {
    return this.refs ? this.refs.node : null
  }

  set node (value) {}

  reflect (surface=null) {
    this._surface && this._surface.remove(this.node)
    surface && ((this._surface = surface), this._surface.add(this.node))
    this.forceUpdate()
  }

  render () {

    return (
      <div onMouseEnter={() => (this._surface && (this._surface.active = this.node))}>
        <div ref='node' { ...this.props } />
      </div>
    )
  }

}

Mirror.displayName = displayName
Mirror.propTypes = propTypes

export default Mirror
