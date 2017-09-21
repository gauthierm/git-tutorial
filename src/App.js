import React, { Component } from 'react';
import Ball from './Ball';

import './App.css';

const field = {
  width: 720,
  height: 480,
};

const numBalls = 7;
const moveDelay = 5000;
const ballSize = 200;
const ballDistance = 0.75;

function getDistance(x1, y1, x2, y2) {
  const xDelta = x1 - x2;
  const yDelta = y1 - y2;
  return Math.sqrt((xDelta * xDelta) + (yDelta * yDelta));
}

function getMinDistance(positions, coords) {
  return positions.reduce((sum, value) => {
    const distance = getDistance(coords.x, coords.y, value.x, value.y);
    return Math.min(sum, distance);
  }, field.width + field.height);
}

function getRandomCoords() {
  return {
    x: Math.random() * field.width,
    y: Math.random() * field.height,
  };
}

function getNewCoords(positions, minDistance) {
  let coords = getRandomCoords();
  while (getMinDistance(positions, coords) < minDistance) {
    coords = getRandomCoords();
  }
  return coords;
}

class App extends Component {
  constructor(props) {
    super(props);
    const initialPositons = [];
    const nextPositions = [];
    this.state = {
      balls: Array.from(new Array(numBalls), (x, i) => {
        const initialCoords = getNewCoords(initialPositons, ballSize * ballDistance);
        const nextCoords = getNewCoords(nextPositions, ballSize * ballDistance);
        initialPositons.push(initialCoords);
        nextPositions.push(nextCoords);
        return {
          id: i,
          initialPositon: initialCoords,
          nextPosition: nextCoords,
        };
      }),
    };

    this.updateBalls = this.updateBalls.bind(this);

    setInterval(this.updateBalls, moveDelay);
  }
  updateBalls() {
    this.setState((oldState) => {
      const { balls } = oldState;
      const positions = [];

      balls.forEach((ball) => {
        const mutatedBall = ball;
        const newCoords = getNewCoords(positions, ballSize * ballDistance);
        positions.push(newCoords);
        mutatedBall.nextPosition.x = newCoords.x;
        mutatedBall.nextPosition.y = newCoords.y;
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
