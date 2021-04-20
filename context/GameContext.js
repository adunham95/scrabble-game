import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = ({ children, appData }) => {
  const [state, setState] = useState({
    tiles: [],
    id: '00',
    lastDropped: null,
    availableTile: [],
    playerTurn: 0,
    ...appData,
  });
  return (
    <GameContext.Provider value={[state, setState]}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
