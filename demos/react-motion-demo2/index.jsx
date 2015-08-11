import React from 'react';
import Demo from './Demo';
import Surface, { Mirror } from 'react-mirror';

class Demo02App extends React.Component {

  componentDidMount() {
    this.refs.m01.reflect(this.refs.surface);
  }

  render() {
    return (
      <div>
        <span style={{ display: 'inline-block' }}>
          <Surface ref="surface">
            <Demo />
          </Surface>
        </span>
        <span style={{ display: 'inline-block' }}>
          <Mirror ref="m01" />
        </span>
      </div>
    );
  }

}

React.render(<Demo02App />, document.querySelector('#content'));
