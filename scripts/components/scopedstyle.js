import React, { Component } from 'react'

const displayName = 'ScopedStyle'
const propTypes = {
  rules: React.PropTypes.string.isRequired
}

export default class ScopedStyle extends Component {

  constructor (props) {
    super(props)
    //var d = document.createDocumentFragment()
  }

  shouldComponentUpdate () {
    return false
  }

  /*componentDidMount () {
    React.findDOMNode(this.refs.style).innerHTML = this.props.children
  }*/

  componentDidMount () {
    this._fragment = document.createDocumentFragment()
    this._imprint = document.createElement('div')
    this._fragment.appendChild(this._imprint)
    //this._imprint = document.createDocumentFragment()
    this.update()
  }

  update () {
    const { rules, children } = this.props
    this._element = (
      <div className='custom-scope'>
        <style>{ rules }</style>
        { children }
      </div>
    )
    window._reactElement = React.render(this._element, this._imprint)
    window._imprint = this._imprint
    window._element = this._element
    window._style = React.findDOMNode(this._imprint)
    window._fragment = this._fragment
    console.debug("DONE")
  }

  appendTo (node) {
    console.debug("TYPEOF!! " + typeof(this))
    React.findDOMNode(node).appendChild(this._imprint)
  }


  render () {

    return null
  }
}

ScopedStyle.displayName = displayName
ScopedStyle.propTypes = propTypes
