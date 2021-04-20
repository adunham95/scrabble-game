import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const useGame = () => {
  const [state, setState] = useContext(GameContext);

  function setGameDetails(gameData) {
    console.log(gameData);
    setState((oldState) => ({
      ...oldState,
      ...gameData,
    }));
  }

  function addPiece({
    x, y, letter, id, thisTurn = false,
  }) {
    setState((oldState) => ({
      ...oldState,
      availableTile: oldState.availableTile.filter((t) => t.id !== id),
      tiles: [...oldState.tiles.filter((t) => t.id !== id), {
        x, y, letter, id, thisTurn,
      }],
    }));
  }

  function canDropTile(x, y) {
    // console.log(state.pieces);
    const cardIndex = state.tiles.findIndex((c) => c.x === x && c.y === y);
    return cardIndex < 0;
    // return true;
  }

  function setPieces() {
    setState((oldState) => ({
      ...oldState,
      tiles: oldState.tiles.map((t) => { t.thisTurn = false; return t; }),
    }));
  }

  return {
    addPiece,
    canDropTile,
    setGameDetails,
    setPieces,
    id: state.id,
    tiles: state.tiles,
    lastDropped: state.lastDropped,
    availableTile: state.availableTile,
  };
};

export default useGame;
