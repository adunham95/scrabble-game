import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../components/Board/board';
import TileList from '../components/Tile/tileList';
import { GameProvider } from '../context/GameContext';

const letters = [
  { id: 1, letter: 'A' },
  { id: 2, letter: 'B' },
  { id: 3, letter: 'C' },
  { id: 4, letter: 'D' },
  { id: 5, letter: 'E' },
  { id: 6, letter: 'F' },
  { id: 7, letter: 'G' },
  { id: 8, letter: 'H' },
];

const prevTurns = [
  {
    x: 5, y: 5, letter: 'A', id: 700, thisTurn: false,
  },
  {
    x: 5, y: 5, letter: 'D', id: 701, thisTurn: false,
  },
];

const AppData = {
  availableTile: letters,
  tiles: prevTurns,
};
export default function Home() {
  return (
    <div className="app">
      <GameProvider appData={AppData}>
        <DndProvider backend={HTML5Backend}>
          <Board />
          <div>
            <TileList />
          </div>
        </DndProvider>
      </GameProvider>
    </div>
  );
}
