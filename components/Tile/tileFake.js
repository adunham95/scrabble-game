import React from 'react';
import styles from './tile.module.scss';

const FakeTile = ({ letter, number = 7 }) => (
  <div className={styles.tileFakeContainer}>
    <div className={styles.tileFake}>
      <span className={styles.tileFakeLetter}>{letter}</span>
      <span className={styles.tileFakeScore}>{number}</span>
    </div>
  </div>
);

export default FakeTile;
