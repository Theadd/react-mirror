import React, { Component } from 'react'
import Replicator from './replicator'
import Mirror from './mirror'

const displayName = 'Surface'
const propTypes = {
  children: React.PropTypes.element.isRequired,
  initialMirror: React.PropTypes.bool,
  equalityTest: React.PropTypes.any
}
const defaultProps = {
  initialMirror: true,
  equalityTest: true
}

class Surface extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate ({ equalityTest, children }) {
    const equal = typeof equalityTest === 'function' ? equalityTest(
      React.Children.only(this.props.children).props,
      React.Children.only(children).props
    ) : equalityTest

    !equal && this.update(children)
    return false
  }

  componentDidMount () {
    const { initialMirror=true } = this.props
    initialMirror && (this.refs.prime.reflect(this), (this.active = this.refs.prime.node))
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
    this.refs.repl.remove(React.findDOMNode(mirror))
  }

  update (children=null) {
    children && (this.refs.repl.children = children)
    this.refs.repl.update()
  }

  render () {
    const { children, initialMirror=true, ...props } = this.props

    return (
      <div>
        { initialMirror ? <Mirror ref='prime'></Mirror> : null }
        <Replicator ref='repl' { ...props }>
          { children }
        </Replicator>
      </div>
    )
  }

}

Surface.displayName = displayName
Surface.propTypes = propTypes
Surface.defaultProps = defaultProps

export default Surface
