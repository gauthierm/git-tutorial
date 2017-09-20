import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const springParams = { stiffness: 120, damping: 7 };

export default function Ball(props) {
  const { ball } = props;
  return (
    <Motion key={ball.id} defaultStyle={{
      x: ball.initialPositon.x,
      y: ball.initialPositon.y,
    }} style={{
      x: spring(ball.nextPosition.x, springParams),
      y: spring(ball.nextPosition.y, springParams),
    }}>
      {value =>
        <div className={`Ball Ball-${ball.id}`} style={{
          transform: `translate(${value.x}px, ${value.y}px)`,
        }} />
      }
    </Motion>
  );
}

Ball.propTypes = {
  id: PropTypes.string.isRequired,
}
  