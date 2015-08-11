import React, { Component } from 'react'
import Playground from 'component-playground'
import Surface, { Mirror } from 'react-mirror'
import Style from '../../components/style'
import LightsOut from '../../components/lightsout'

import example from 'raw!./code.example'

const displayName = 'Main'

export default class Main extends Component {

  render () {

    return (
      <div className="component-documentation main-page">
        <Style>{ pageStyles }</Style>
        <Playground codeText={ example }
                    noRender={ false }
                    theme='mdn-like'
                    collapsableCode={true}
                    scope={{ React: React, Surface: Surface, Mirror: Mirror, LightsOut: LightsOut }} />
      </div>
    )
  }
}

Main.displayName = displayName

const pageStyles = String.raw`
.main-page .playground {
  transform: scaleY(-1);
  box-shadow: 0 0 150px 70px rgba(126, 128, 89, 0.47);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.main-page .playgroundCode {
  transform: scaleY(-1);
  margin-bottom: 1px;
}

.main-page .playgroundPreview {
  transform: scaleY(-1);
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 8px 8px 3px 3px;
  background-color: rgba(126, 128, 89, 0.47);
  box-shadow: 0 0 95px 42px rgba(0, 0, 0, 0.2) inset, 0 0 7px 2px rgba(0, 0, 0, 0.25);
}

.CodeMirror.CodeMirror-wrap {
  padding: 10px;
  border-radius: 3px 3px 8px 8px;
  border: 1px solid rgba(0, 0, 0, 0.42);
  box-shadow: 0 0 332px 150px rgba(126, 128, 89, 0.6) inset;
  font-size: 0.9em;
}

.playgroundPreview .react-mirror-example > div:first-child {
  opacity: 0.5;
  transition: opacity .5s ease;
}

.playgroundPreview .react-mirror-example > div:nth-child(2) {
  opacity: 0.5;
  transition: opacity .5s ease;
}

.playgroundPreview:hover .react-mirror-example > div:first-child {
  opacity: 1;
}

.playgroundPreview:hover .react-mirror-example > div:nth-child(2) {
  opacity: 1;
}

.main-page .playgroundToggleCodeBar {
  transform: scaleY(-1);
  box-shadow: 0px -47px 44px 12px rgb(182, 183, 160) inset;
  position: relative;
  padding-top: -60px;
  margin-top: -6px;
  float: right;
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  line-height: 80px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.2em;
  border-radius: 0 0 8px 8px;
  border: 1px solid rgb(146, 146, 146);
  border-top: 0;
  box-sizing: border-box;
}

.main-page .playgroundToggleCodeLink {
  padding: 5px 15px;
  border: 1px solid rgb(147, 147, 147);
  border-radius: 40px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0 19px 1px rgba(126, 128, 89, 0.47) inset;
  text-shadow: 0 0 1px rgba(249, 106, 57, 0.3), 1px 1px 1px rgba(0, 0, 0, 0.28);
  color: rgba(249, 106, 57, 0.3);
}

.main-page .playgroundToggleCodeLink:hover {
  color: rgba(249, 106, 57, 0.7);
}

.react-mirror-example h2 {
  color: white;
  text-shadow: 1px 1px 4px rgba(16, 35, 62, 0.9);
  font-size: 1.3em;
  padding-left: 10px;
  z-index: 1111px;
  pointer-events: all;
}
`
