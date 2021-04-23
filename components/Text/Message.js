import React from 'react';
import { capitalize } from '../../api/utilites/utilities';
import { Icon } from '../Icons/Icon';
import styles from './message.module.scss';

export const Message = ({ type, text }) => {
  const iconSize = '25px';
  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <Icon
            name="exclamationcircle"
            height={iconSize}
            width={iconSize}
          />
        );
      case 'success':
        return (
          <Icon
            name="checkcircle"
            height={iconSize}
            width={iconSize}
          />
        );
      case 'warn':
        return (
          <Icon
            name="exclamationcircle"
            height={iconSize}
            width={iconSize}
          />
        );
      default:
        return (
          <Icon
            name="questioncircle"
            height={iconSize}
            width={iconSize}
          />
        );
    }
  };

  if (type === '') {
    return (
      <></>
    );
  }
  return (
    <div className={`${styles[`message${capitalize(type)}`]} ${styles.message}`}>
      <div className={styles.iconContainer}>
        {getIcon()}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.textType}>{capitalize(type)}</p>
        <p className={styles.textText}>{text}</p>
      </div>
    </div>
  );
};
