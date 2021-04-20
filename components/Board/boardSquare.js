import React from 'react';
import { useDrop } from 'react-dnd';
import useGame from '../../hooks/useGame';
import { ItemTypes } from '../DragTypes/DragTypes';

const BoardSquare = ({
  children, x, y, boardWidth = 10,
}) => {
  const { addPiece, canDropTile } = useGame();
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TILE,
      canDrop: () => canDropTile(x, y),
      drop: (item) => addPiece({ x, y, ...item }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y],
  );
  return (
    <div
      ref={drop}
      style={{
        width: `calc(${100 / boardWidth}% - 2px)`, paddingBottom: `calc(${100 / boardWidth}% - 2px)`, margin: '1px', position: 'relative',
      }}
    >
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
    </div>
  );
};

export default BoardSquare;
