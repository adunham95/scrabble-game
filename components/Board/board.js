import React, { useState } from 'react';
import useGame from '../../hooks/useGame';
import Tile from '../Tile/tile';
import BoardSquare from './boardSquare';

const boardWidth = 12;
const boardHeight = 12;

function renderSquare(i, cards = []) {
  const x = i % boardWidth;
  const y = Math.floor(i / boardWidth);

  const cardIndex = cards.findIndex((c) => c.x === x && c.y === y);
  const hasItem = cardIndex >= 0;

  return (
    <BoardSquare
      x={x}
      y={y}
      key={i}
      boardWidth={boardWidth}
    >
      {hasItem && (
      <Tile
        key={cards[cardIndex].id}
        id={cards[cardIndex].id}
        letter={cards[cardIndex].letter}
      />
      )}
    </BoardSquare>
  );
}

const Board = () => {
  const { tiles } = useGame();

  const squares = [];
  for (let i = 0; i < (boardWidth * boardHeight); i++) {
    squares.push(renderSquare(i, tiles));
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
