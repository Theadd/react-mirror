import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Replicator from './replicator'
import Mirror from './mirror'

const displayName = 'Surface'
const propTypes = {
  children: PropTypes.element.isRequired,
  initialMirror: PropTypes.bool,
  equalityTest: PropTypes.any,
  keepInSync: PropTypes.bool
}
const defaultProps = {
  initialMirror: true,
  equalityTest: true,
  keepInSync: false
}

class Surface extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate ({ equalityTest, keepInSync, children }) {
    const equal = typeof equalityTest === 'function' ? equalityTest(
      React.Children.only(this.props.children).props,
      React.Children.only(children).props
    ) : equalityTest

    !equal && (this.update(children, keepInSync === this.props.keepInSync ? null : keepInSync), 1) || (
      (keepInSync !== this.props.keepInSync) && (this.refs.repl.keepInSync = keepInSync)
    )
    return false
  }

  componentDidMount () {
    const { initialMirror } = this.props
    initialMirror && (this.refs.prime.reflect(this), (this.active = this.refs.prime.node))
  }

  get active () {
    return this.refs ? this.refs.repl.master : null
  }

  set active (mirror) {
    mirror && (this.refs.repl.master = ReactDOM.findDOMNode(mirror))
  }

  add (mirror) {
    this.refs.repl.add(ReactDOM.findDOMNode(mirror))
  }

  remove (mirror) {
    this.refs.repl.remove(ReactDOM.findDOMNode(mirror))
  }

  update (children=null, keepInSync=null) {
    children && (this.refs.repl.children = children)
    keepInSync != null && (this.refs.repl.keepInSync = keepInSync)
    this.refs.repl.update()
  }

  /**
   *
   * @param {?boolean} [sync=null] - If true, it will internally render the controlled component in advance. If unspecified, it only syncs if it was never rendered before. If set to false it just returns that node.
   * @returns {DOMNode}
   */
  getDOMNode (sync=null) {
    return this.refs.repl.getDOMNode(sync)
  }

  render () {
    const { children, equalityTest, initialMirror, ...props } = this.props

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
