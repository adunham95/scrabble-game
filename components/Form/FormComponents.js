import React from 'react';
import styles from './form.module.scss';

const FormHeader = ({ className = '', title }) => (
  <h2 className={`${styles.formHeader} ${className}`}>{title}</h2>
);

export default FormHeader;
