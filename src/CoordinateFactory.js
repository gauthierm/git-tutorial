function getDistance(x1, y1, x2, y2) {
  const xDelta = x1 - x2;
  const yDelta = y1 - y2;
  return Math.sqrt((xDelta * xDelta) + (yDelta * yDelta));
}

function getMinDistance(positions, coords) {
  return positions.reduce((sum, value) => {
    const distance = getDistance(coords.x, coords.y, value.x, value.y);
    return Math.min(sum, distance);
  }, Infinity);
}

function getRandomCoords(minDistance, width, height) {
  const halfMinDistance = minDistance / 2;
  const adjustedWidth = width - minDistance;
  const adjustedHeight = height - minDistance;
  const x = Math.random() * adjustedWidth;
  const y = Math.random() * adjustedHeight;
  return {
    x: x + halfMinDistance,
    y: y + halfMinDistance,
  };
}

export default class CoordinateFactory {
  constructor(minDistance, width, height) {
    this.width = width;
    this.height = height;
    this.minDistance = minDistance;

    this.coords = [];

    if (width - minDistance < 0) {
      throw new Error(`Can not get coords with minDistance ${minDistance} and width ${width}`);
    }

    if (height - minDistance < 0) {
      throw new Error(`Can not get coords with minDistance ${minDistance} and height ${height}`);
    }
  }
  getNext() {
    let coords = getRandomCoords(this.minDistance, this.width, this.height);
    while (getMinDistance(this.coords, coords) < this.minDistance) {
      coords = getRandomCoords(this.minDistance, this.width, this.height);
    }
    this.coords.push(coords);
    return coords;
  }
}
