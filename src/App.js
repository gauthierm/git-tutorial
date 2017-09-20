import React, { Component } from 'react';
import Ball from './Ball';

import './App.css';

const field = {
  width: 720,
  height: 480,
};

const numBalls = 10;
const moveDelay = 5000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balls: Array.from(new Array(numBalls), (x, i) => ({
        id: i,
        initialPositon: {
          x: Math.random() * field.width,
          y: Math.random() * field.height,
        },
        nextPosition: {
          x: Math.random() * field.width,
          y: Math.random() * field.height,
        },
      })),
    };

    this.updateBalls = this.updateBalls.bind(this);

    setInterval(this.updateBalls, moveDelay);
  }
  updateBalls() {
    this.setState((oldState) => {
      const { balls } = oldState;

      balls.forEach((ball) => {
        const mutatedBall = ball;
        mutatedBall.nextPosition.x = Math.random() * field.width;
        mutatedBall.nextPosition.y = Math.random() * field.height;
      });

      return {
        balls,
      };
    });
  }
  render() {
    const { balls } = this.state;
    return (
      <div
        className="App"
        style={{
          width: field.width,
          height: field.height,
        }}
      >
        {balls.map(ball => <Ball ball={ball} />)}
      </div>
    );
  }
}

export default App;
