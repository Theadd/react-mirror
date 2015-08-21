import React, { Component } from 'react'
import Surface, { Mirror } from 'react-mirror'
import Style from '../../components/style'
import LightsOut from '../../components/lightsout'
import shallowEqual from './shallowequal'

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

  render () {
    // <Style>{ pageStyles }</Style>

    //<Clock time={ (((this.state.time / 1000) >>> 0) * 1000 ) - 13000 } className='style-2' />

    return (
      <div className="page-wrapper">
        <header style={{ backgroundColor: 'tan', padding: 20 }}>
          <button onClick={ () => this.setState({ time: Date.now() }) }>
            { `this.setState({ time: Date.now() })` }
          </button>
          <Surface ref='surfClock5s' initialMirror={ false } equalityTest={ shallowEqual }>
            <Clock time={ (((5 + this.state.time / 1000) >>> 0) * 1000 ) } className='style-3' />
          </Surface>
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
