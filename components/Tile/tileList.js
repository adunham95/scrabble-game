import React from 'react';
import useGame from '../../hooks/useGame';
import Tile from './tile';

const TileList = () => {
  const { availableTile } = useGame();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {availableTile.map((l) => (
        <Tile
          letter={l.letter}
          key={l.id}
          id={l.id}
          isDraggable
          style={{ height: '50px', width: '50px' }}
        />
      ))}
    </div>
  );
};

export default TileList;
