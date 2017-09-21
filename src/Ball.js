import React from 'react';
import PropTypes from 'prop-types';

import { Motion, spring } from 'react-motion';

const springParams = { stiffness: 220, damping: 14 };

export default function Ball(props) {
  const { ball } = props;
  return (
    <Motion
      key={ball.id}
      defaultStyle={{
        x: ball.initialPositon.x,
        y: ball.initialPositon.y,
      }}
      style={{
        x: spring(ball.nextPosition.x, springParams),
        y: spring(ball.nextPosition.y, springParams),
      }}
    >
      {value => (
        <div
          className={`Ball Ball-${ball.id}`}
          style={{
            transform: `translate(${value.x}px, ${value.y}px)`,
          }}
        />
      )}
    </Motion>
  );
}

const coordsPropType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

Ball.propTypes = {
  ball: PropTypes.shape({
    id: PropTypes.string.isRequired,
    initialPositon: coordsPropType,
    nextPosition: coordsPropType,
  }).isRequired,
};
