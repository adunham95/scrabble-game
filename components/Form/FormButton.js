import React from 'react';
import styles from './form.module.scss';

const FormButton = ({ onClick = () => {}, children, className }) => (
  <button
    onClick={onClick}
    className={`${styles.formButton}  ${className}`}
  >
    {children}
  </button>
);

export { FormButton };
