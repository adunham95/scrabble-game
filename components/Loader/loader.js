import React from 'react';
import styles from './loader.module.scss';

const Loader = (type) => {
  switch (type) {
    default:
      return (
        <div className={styles.loaderDot}>
          <span />
          <span />
          <span />
          <span />
        </div>
      );
  }
};

export default Loader;
