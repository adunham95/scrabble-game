import React from 'react';
import styles from './form.module.scss';

const FormHeader = ({ className = '', title }) => (
  <h2 className={`${styles.formHeader} ${className}`}>{title}</h2>
);

const FormLabel = ({ className = '', text, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className={`${styles.formLabel} ${className}`}
  >
    {text}
  </label>
);

const FormSubText = ({ className = '', text }) => (
  <p className={`${styles.formSubText} ${className}`}>
    {text}
  </p>
);

export { FormHeader, FormLabel, FormSubText };
