import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../DragTypes/DragTypes';

const Tile = ({
  letter, isDraggable = false, id, style,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.TILE,
    canDrag: isDraggable,
    item: {
      letter,
      id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), []);

  return (
    <div
      ref={drag}
      style={{
        // position: 'absolute',
        // top: 0,
        background: 'green',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isDragging ? 0.5 : 1,
        ...style,
      }}
    >
      {letter}
    </div>
  );
};

export default Tile;
