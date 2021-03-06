import React from 'react';
import { generateID } from '../../utilities/utils';
import { Icon } from '../Icons/Icon';
import styles from './gameblock.module.scss';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function LightenDarkenColor(col, amt, opacity = 1) {
  col = col.replace(/^#/, '');
  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r1, g1, b1] = col.match(/.{2}/g);
  ([r1, g1, b1] = [parseInt(r1, 16) + amt, parseInt(g1, 16) + amt, parseInt(b1, 16) + amt]);

  r1 = Math.max(Math.min(255, r1), 0).toString(16);
  g1 = Math.max(Math.min(255, g1), 0).toString(16);
  b1 = Math.max(Math.min(255, b1), 0).toString(16);

  const rr = (r1.length < 2 ? '0' : '') + r1;
  const gg = (g1.length < 2 ? '0' : '') + g1;
  const bb = (b1.length < 2 ? '0' : '') + b1;

  const hex = `#${rr}${gg}${bb}`;

  const { r, b, g } = hexToRgb(hex);

  //   console.log({ r2 });

  return `rgba(${r},${g},${b},${opacity})`;
//   return 'green';
}

function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const GameBlock = ({
  title, rounds = 4, tiles = [], onEdit = () => {},
}) => {
  const generateIcon = () => {
    // const defaultIcons = shuffle(tiles);
    let array = [...tiles];
    array = shuffle(array);
    if (tiles.length > 6) {
      array = array.slice(0, 6);
      array.push({ letter: tiles.length - 7, _id: generateID(4) });
    }
    if (tiles.length === 0) {
      array.push({ letter: '0', _id: generateID(4) });
    }

    return array.map((t) => (
      <span
        key={t._id}
        className={styles.gameBlockIcon}
        // style={{ background: t }}
      >
        {t.letter}
      </span>
    ));

    // return defaultIcons;
  };

  return (
    <div className={styles.gameBlockContainer}>
      <div className={styles.gameBlock}>
        <div className={styles.gameBlockIconContainer}>
          { generateIcon()}
        </div>
        <h2 className={styles.gameBlockTitle}>{title}</h2>
        <div>
          {/* <p className={styles.gameBlockTask}>
            <span className={styles.gameBlockTaskIcon} />
            Rounds:
            {' '}
            {rounds}
          </p> */}
          <div className={styles.gameBlockTask}>
            <span className={styles.gameBlockTaskIcon}>
              <Icon name="tile" />
            </span>
            Tiles:
            {' '}
            {tiles.length}
          </div>
        </div>
        <div>
          <div />
        </div>
        <div className={styles.gameBlockAction}>
          <button
            className={styles.gameBlockActionButton}
            onClick={onEdit}
          >
            Edit
          </button>
          <button className={styles.gameBlockActionButton}>Play</button>
        </div>
      </div>
    </div>
  );
};

const NewGameBlock = ({ onClick = () => {} }) => (
  <div className={styles.gameBlockContainer}>
    <div className={styles.gameBlock}>
      <h1>New Game</h1>
      <button onClick={onClick}>Create New Game</button>
    </div>
  </div>
);

export default GameBlock;
export { NewGameBlock };
