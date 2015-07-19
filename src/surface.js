import React, { Component } from 'react'
import Replicator from './replicator'
import Mirror from './mirror'

const displayName = 'Surface'
const propTypes = {}

class Surface extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate () {
    // TODO: props
    this.update()
    return false
  }

  componentDidMount () {
    this.refs.prime.reflect(this)
    this.active = this.refs.prime.node
  }

  get active () {
    return this.refs ? this.refs.repl.master : null
  }

  set active (mirror) {
    mirror && (this.refs.repl.master = React.findDOMNode(mirror))
  }

  add (mirror) {
    this.refs.repl.add(React.findDOMNode(mirror))
  }

  remove (mirror) {
    // TODO
  }

  update () {
    this.refs.repl.update()
  }

  render () {
    let { children, ...props } = this.props

    return (
      <div>
        <Mirror ref='prime'></Mirror>
        <Replicator ref='repl' { ...props }>
          { children }
        </Replicator>
      </div>
    )
  }

}

Surface.displayName = displayName
Surface.propTypes = propTypes

export default Surface
