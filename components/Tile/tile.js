import React from 'react';

const Tile = ({ letter }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    background: 'green',
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    {letter}
  </div>
);

export default Tile;
