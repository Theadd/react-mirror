import React, { Component } from 'react'

const mutations = {
  attributes: true,
  childList: true,
  subtree: true
}

class Replicator extends Component {

  constructor (props) {
    super(props)
    this.state = {}
    this._ghost = null
    this._master = null
    this._mirrors = new Set()
  }

  shouldComponentUpdate ({ children, ...props }) {
    this._element = <div { ...props }>{ children }</div>
    this._master && this.update()
    return false
  }

  get master () {
    return this._master
  }

  set master (value) {
    value && this.update(value)
  }

  set children (value) {
    if (value) {
      const { children, ...props } = this.props
      this._element = <div { ...props }>{ value }</div>
    }
  }

  add (mirror=null) {
    mirror && (
      this._mirrors.add(mirror),
      (!this._master && (this.master = mirror, 1)) || this.update()
    )
  }

  remove (mirror=null) {
    mirror && (
    this.master === mirror && (
      this._master = null,
      this._mirrors.size && (
        this.master = this._mirrors.values().next().value, 1
      )
    ) || (this._mirrors.delete(mirror), this.update()))
  }

  render () {

    return null
  }

  handleMutations (target) {
    this._observer = new MutationObserver((records, observer) => (
      observer.takeRecords(),
        observer.disconnect(),
        this.update()
    ))
    this._observer._target = target
  }

  componentDidMount () {
    let { children, ...props } = this.props
    this._element = <div { ...props }>{ children }</div>
    this._imprint = document.createElement('div')
    this.handleMutations(this._imprint)
    this._master && this.update()
  }

  update (master=null) {
    if (master != null) {
      if (this._master !== master) {
        if (this._master && !this._mirrors.has(this._master)) {
          this._mirrors.add(this._master)
        }
        if (this._mirrors.has(master)) {
          master.firstChild && master.removeChild(master.firstChild)
          this._mirrors.delete(master)
        }
        this._master = master
      }
    }
    if (this._master != null) {
      !this._ghost && (this._ghost = document.createElement('div'))
      this._master.parentNode.appendChild(this._ghost)
      this._ghost.appendChild(this._imprint)
      React.render(this._element, this._imprint)
      this._master.parentNode.removeChild(this._ghost)
      this._master.appendChild(this._ghost.firstChild)

      let node = this._master.firstChild
      this._master.style.pointerEvents = 'all'

      this._mirrors.size && this._mirrors.forEach( mirror => (
        mirror.firstChild ? mirror.replaceChild(node.cloneNode(true), mirror.firstChild) : mirror.appendChild(node.cloneNode(true)),
          (mirror.style.pointerEvents = 'none')
      ))

      this._observer.observe(this._observer._target, mutations)
    }


  }

}

export default Replicator
