import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const displayName = 'Mirror'
const propTypes = {}

class Mirror extends Component {

  constructor (props) {
    super(props)
    this._surface = null
    this.state = {}
  }

  shouldComponentUpdate () {

    return false
  }

  get node () {
    return this.refs ? this.refs.node : null
  }

  set node (value) {}

  reflect (surface=null) {
    if (surface !== this._surface) {
      this._surface && this._surface.remove(this.node)

      const node = ReactDOM.findDOMNode(this.node)
      while (node.firstChild) node.removeChild(node.firstChild)

      this._surface = surface
      surface && this._surface.add(this.node)

      this.forceUpdate(() => this._surface && this._surface.update())
    }
  }

  render () {
    const { children=null, ...props } = this.props

    return (
      <div onMouseEnter={ () => (this._surface && (this._surface.active = this.node)) }>
        <div ref='node' { ...props } />
      </div>
    )
  }

}

Mirror.displayName = displayName
Mirror.propTypes = propTypes

export default Mirror
