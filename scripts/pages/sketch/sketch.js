import React, { Component } from 'react'
import Surface, { Mirror } from 'react-mirror'
import Style from '../../components/style'
import LightsOut from '../../components/lightsout'
import shallowEqual from './shallowequal'
import ScopedStyle from '../../components/scopedstyle'
import { createProxy, getForceUpdate } from 'react-proxy'

import './sketch.css'

const TIMESTAMP = 1439292901338
const displayName = 'Sketch'

export default class Sketch extends Component {

  constructor (props) {
    super(props)
    this.state = {
      time: Date.now()
    }
  }

  componentDidMount () {
    this.refs.scoped.appendTo(this.refs.container)
    
    setTimeout(() => {
      const mountedInstances = proxy.update(Clock2);
      const forceUpdate = getForceUpdate(React);
      mountedInstances.forEach(forceUpdate);
      return 1;
    }, 6000)
  }

  render () {
    // <Style>{ pageStyles }</Style>
    const scope = '.custom-scope'
    //<Clock time={ (((this.state.time / 1000) >>> 0) * 1000 ) - 13000 } className='style-2' />

    let scopedStyleTest = String.raw`
${scope} p {
  display: block;
  box-shadow: 0 0 150px 70px rgba(126, 128, 89, 0.47);
  background-color: rgba(150, 0, 0, 0.2);
  border-radius: 8px;
  border: 5px solid black;
  transition: background-color 1s ease;
}

@media (max-width: 600px) {
  ${scope} p {
    background-color: rgba(0, 150, 0, 0.2);
  }
}
`

    return (
      <div className="page-wrapper">
        <header style={{ backgroundColor: 'tan', padding: 20 }}>
          <button onClick={ () => this.setState({ time: Date.now() }) }>
            { `this.setState({ time: Date.now() })` }
          </button>
          <Surface ref='surfClock5s' initialMirror={ false } equalityTest={ shallowEqual }>
            <Clock time={ (((5 + this.state.time / 1000) >>> 0) * 1000 ) } className='style-3' />
          </Surface>
          <p>outer paragraph</p>
          <div ref='container'>
            <p>inner paragraph</p>
          </div>
          <ScopedStyle ref='scoped' rules={ scopedStyleTest }>
            <p>HELLA WORLD!</p>
          </ScopedStyle>
          <Proxy time={ this.state.time } className='style-1' />
        </header>
        <div className="sketch-page">
          <Clock time={ this.state.time } className='style-1' />
          <hr />
          <Surface ref='surfClockInline' equalityTest={ false }>
            <Clock time={ (((this.state.time / 1000) >>> 0) * 1000 ) - 13000 } className='style-2' />
          </Surface>
          <hr />
          <hr />
          <Mirror ref='sharedMirror' />
          <button onClick={ () => this.refs.sharedMirror.reflect(this.refs.surfClock5s) }>reflect(surfClock5s)</button>
          <button onClick={ () => this.refs.sharedMirror.reflect(this.refs.surfClockInline) }>reflect(surfClockInline)</button>
          <button onClick={ () => this.refs.sharedMirror.reflect(null) }>reflect(null)</button>
        </div>
      </div>
    )
  }
}

Sketch.displayName = displayName

const clockDisplayName = 'Clock'

class Clock extends Component {

  render () {
    const { time=Date.now(), style={}, className='', methodName='toLocaleString' } = this.props
    const date = new Date(time)

    return (
      <div className={ 'clock ' + className } style={ style }>
        { date[typeof date[String(methodName)] === 'function' ? String(methodName) : 'toLocaleString' ]() }
      </div>
    )
  }
}

Clock.displayName = clockDisplayName

// const clockDisplayName = 'Clock'

class Clock2 extends Component {

  render () {
    const { time=Date.now(), style={}, className='', methodName='toString' } = this.props
    const date = new Date(time)

    return (
      <div className={ 'clock ' + className } style={ style }>
        <p>{ date[typeof date[String(methodName)] === 'function' ? String(methodName) : 'toString' ]() }</p>
      </div>
    )
  }
}

Clock2.displayName = clockDisplayName

const proxy = createProxy(Clock);

const Proxy = proxy.get();
