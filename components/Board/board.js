import React, { useState } from 'react';
import useGame from '../../hooks/useGame';
import Tile from '../Tile/tile';
import BoardSquare from './boardSquare';

function renderSquare(i, cards = [], boardWidth) {
  const x = i % boardWidth;
  const y = Math.floor(i / boardWidth);

  const cardIndex = cards.findIndex((c) => c.x === x && c.y === y);
  const hasItem = cardIndex >= 0;
  const cardItem = cards[cardIndex];

  return (
    <BoardSquare
      x={x}
      y={y}
      key={i}
      boardWidth={boardWidth}
    >
      {hasItem && (
      <Tile
        key={cardItem.id}
        id={cardItem.id}
        letter={cardItem.letter}
        isDraggable={cardItem.thisTurn}
      />
      )}
    </BoardSquare>
  );
}

const Board = () => {
  const { tiles, boardWidth } = useGame();

  const squares = [];
  for (let i = 0; i < (boardWidth * boardWidth); i++) {
    squares.push(renderSquare(i, tiles, boardWidth));
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

export default Board;
