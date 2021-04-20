import React from 'react';
import Tile from '../Tile/tile';

const boardWidth = 10;
const boardHeight = 10;

const cards = [{ x: 1, y: 5 }, { x: 2, y: 7 }];

function renderSquare(i) {
  const x = i % boardWidth;
  const y = Math.floor(i / boardWidth);

  const cardIndex = cards.findIndex((c) => c.x === x && c.y === y);
  const hasItem = cardIndex >= 0;

  return (
    <div
      key={i}
      style={{
        width: `calc(${100 / boardWidth}% - 2px)`, paddingBottom: `calc(${100 / boardWidth}% - 2px)`, margin: '1px', position: 'relative',
      }}
    >
      <Square
        x={x}
        y={y}
      >
        {hasItem && <Tile letter="Z" />}
      </Square>
    </div>
  );
}

const Board = () => {
  const squares = [];
  for (let i = 0; i < (boardWidth * boardHeight); i++) {
    squares.push(renderSquare(i));
  }

  return (
    <div
      style={{
        maxWidth: '500px',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {squares}
    </div>
  );
};

const Square = ({
  children, x, y, hasItem,
}) => (
  <div
    className="card"
    style={{
      position: 'absolute',
      top: 0,
      background: 'red',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);

export default Board;
