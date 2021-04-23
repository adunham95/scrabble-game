import React from 'react';
import styles from './form.module.scss';

const FormButton = ({
  onClick = () => {}, children, className, type = 'button',
}) => (
  <button
    onClick={onClick}
    type={type}
    className={`${styles.formButton}  ${className}`}
  >
    {children}
  </button>
);

export { FormButton };
