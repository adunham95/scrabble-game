import React, { useState } from 'react';
import { capitalize } from '../../api/utilites/utilities';

const Index = () => {
  const [text, setText] = useState('');

  const styleText = (t) => {
    setText(capitalize(t));
  };

  return (
    <div>
      <input onChange={(e) => styleText(e.target.value)} />
      <p>{text}</p>
    </div>
  );
};

export default Index;
