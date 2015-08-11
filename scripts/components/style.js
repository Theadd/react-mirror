import React, { Component } from 'react'

export default class Style extends Component {

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    React.findDOMNode(this.refs.style).innerHTML = this.props.children
  }

  render () {
    const { children={} } = this.props

    return <style ref='style'>{ children }</style>
  }
}
