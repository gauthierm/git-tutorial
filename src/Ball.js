import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Body } from 'react-game-kit';
import Matter from 'matter-js';

const minVelocity = 3;
const maxVelocity = 6;

function getRandomVelocity() {
  const angle = Math.random() * Math.PI * 2;
  const magnitude = minVelocity;
  const x = magnitude * Math.cos(angle);
  const y = magnitude * Math.sin(angle);

  return { x, y };
}

export default class Ball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      angle: 0,
    };
  }
  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }
  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }
  getWrapperStyles() {
    const { x, y, angle } = this.state;
    const { scale } = this.context;

    return {
      position: 'absolute',
      transform: `translate(${x * scale}px, ${y * scale}px) rotate(${angle}rad)`,
      transformOrigin: 'left top',
    };
  }
  init = (b) => {
    this.body = b;
    const { body } = this.body;

    Matter.Body.setVelocity(body, getRandomVelocity());
    Matter.Body.setAngularVelocity(body, 0.0);
  }
  update = () => {
    const { body } = this.body;
    const magnitude = Matter.Vector.magnitude(body.velocity);

    // Prevent ball from slowing down too much.
    if (magnitude < minVelocity) {
      const scale = minVelocity / magnitude;
      const velocity = Matter.Vector.mult(body.velocity, scale);
      Matter.Body.setVelocity(body, velocity);
    }

    // Prevent ball from speeding up too much.
    if (magnitude > maxVelocity) {
      const scale = maxVelocity / magnitude;
      const velocity = Matter.Vector.mult(body.velocity, scale);
      Matter.Body.setVelocity(body, velocity);
    }

    this.setState(() => ({
      x: body.position.x,
      y: body.position.y,
      angle: body.angle,
    }));
  };
  render() {
    const tab = 14;
    const { id, size, startX, startY } = this.props;
    return (
      <div style={this.getWrapperStyles()}>
        <Body
          id={Matter.Common.nextId()}
          args={[startX, startY, [
            { x: 0, y: 0 },
            { x: size - tab, y: 0 },
            { x: size, y: tab },
            { x: size, y: size },
            { x: 0, y: size },
          ]]}
          ref={this.init}
          restitution={1}
          friction={0.1}
          frictionAir={0}
          shape="fromVertices"
        >
          <div className={`Ball Ball-${id}`} />
        </Body>
      </div>
    );
  }
}

Ball.contextTypes = {
  engine: PropTypes.object,
  scale: PropTypes.number,
};

Ball.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  startX: PropTypes.number.isRequired,
  startY: PropTypes.number.isRequired,
};
