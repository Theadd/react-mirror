/** react-lights-out by Cheng Lou @ https://github.com/chenglou/react-lights-out */
/** Port to React v0.13 (but no TransitionGroup) */

import React, { Component } from 'react/addons'
import classNames from 'classnames'
import './lightsout.css'

var boards = [
  [
    [1,1,0,1,1],
    [1,0,1,0,1],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [1,1,0,1,1]
  ],
  [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1]
  ],
  [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,0,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ],
  [
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0]
  ]
];

class Switch extends Component {

  render () {
    // got the props from parent (LightsOut)
    var classes = {
      'switch': true,
      'switch-done': this.props.done,
      'switch-on': this.props.isOn,
      'switch-off': !this.props.isOn
    }

    return <div className={classNames(classes)} onClick={() => this.props.onClick()} />
  }

}

var LightsOut = React.createClass({

  getInitialState: function() {
    // component's internal value(s)
    this._lastBoard = 0;
    return {
      board: this.getBoardClone(boards[0]),
      done: false
    };
  },

  getBoardClone: function (board) {
    // clone a board
    return board.map(row => row.slice())
  },

  getNewRandomBoard: function() {
    let i;
    while ((i = Math.floor(Math.random() * boards.length)) === this._lastBoard) {}
    this._lastBoard = i;
    return this.getBoardClone(boards[i])
  },

  handleReset: function() {
    // updating the state auto re-renders the component UI
    this.setState({
      board: this.getNewRandomBoard(),
      done: false
    });
  },

  handleSwitchClick: function(i, j) {
    var board = this.state.board;
    var lastCellIndex = board.length - 1;
    // flip current and ajacent switches
    board[i][j] = !board[i][j];
    if (i !== 0) board[i - 1][j] = !board[i - 1][j];
    if (i !== board[i].length - 1) board[i + 1][j] = !board[i + 1][j];
    if (j !== 0) board[i][j - 1] = !board[i][j - 1];
    if (j !== board.length - 1) board[i][j + 1] = !board[i][j + 1];

    var done = this.state.board.every(function(row) {
      return row.every(function(cell) {
        return !!cell;
      });
    });
    // setState is asynchronous. Pass a callback that verifies if all the lights
    // are on; if so, create new game
    this.setState({board: this.state.board, done: done}, function() {
      if (done) {
        setTimeout(function() {
          this.setState({
            board: this.getNewRandomBoard(),
            done: false
          });
        }.bind(this), 1500);
      }
    }.bind(this));
  },

  render: function() {

    return (
      <div className='lights-out'>
        {
          this.state.board.map(function(row, i) {
            return (
              <div key={'tg' + i}>
                { row.map(function(cell, j) {
                    // 5x5 swiches. Pass some props to each one
                    return (
                      <Switch
                        key={'sw' + i + '-' + j}
                        isOn={!!cell}
                        done={this.state.done}
                        onClick={this.handleSwitchClick.bind(this, i, j)} />
                    )
                  }, this) }
              </div>
            )
          }, this)
        }
      </div>
    );
  }
});

export default LightsOut;
