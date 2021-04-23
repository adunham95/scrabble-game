import React from 'react';

const Form = ({ children, onSubmit = () => {}, className = '' }) => (
  <form
    onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
    className={`${className}`}
  >
    {children}
  </form>
);

export default Form;
