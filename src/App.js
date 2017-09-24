import React, { Component } from 'react';
import { Stage, Loop, World } from 'react-game-kit';
import Matter from 'matter-js';
import Ball from './Ball';
import CoordinateFactory from './CoordinateFactory';

import './App.css';

const numBalls = 7;
const ballSize = 112;
const field = {
  width: 720,
  height: 480,
};

const coordinateFactory = new CoordinateFactory(ballSize, field.width, field.height);
const balls = Array.from(new Array(numBalls), (x, i) => ({
  id: i,
  position: coordinateFactory.getNext(),
}));

class App extends Component {
  physicsInit = (engine) => {
    const { world } = engine;

    const ceiling = Matter.Bodies.rectangle(
      field.width / 2, -5,
      field.width, 10,
      { isStatic: true },
    );

    const ground = Matter.Bodies.rectangle(
      field.width / 2, field.height + 5,
      field.width, 10,
      { isStatic: true },
    );

    const leftWall = Matter.Bodies.rectangle(
      -5, field.height / 2,
      10, field.height,
      { isStatic: true },
    );

    const rightWall = Matter.Bodies.rectangle(
      field.width + 5, field.height / 2,
      10, field.height,
      { isStatic: true },
    );

    world.gravity.x = 0;
    world.gravity.y = 0.5;

    Matter.World.add(world, [
      ground,
      ceiling,
      leftWall,
      rightWall,
    ]);
  }
  render() {
    return (
      <div className="App" style={{ width: `${field.width}px`, height: `${field.height}px` }}>
        <Loop>
          <Stage width={field.width} height={field.height}>
            <World onInit={this.physicsInit}>
              {balls.map(ball => (<Ball
                key={ball.id}
                id={ball.id}
                size={ballSize}
                startX={ball.position.x}
                startY={ball.position.y}
              />))}
            </World>
          </Stage>
        </Loop>
      </div>
    );
  }
}

export default App;
