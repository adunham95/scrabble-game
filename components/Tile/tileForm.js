import React, { useState } from 'react';
import { FormInput } from '../Form/FormInput';
import { FormModal } from '../Form/FormModal';
import { FormHeader } from '../Form/FormText';
import { ToggleContent } from '../Modal/modal';

const TileForm = ({ name, _id = '', value }) => {
  const [tileName, setTileName] = useState();
  return (
    <>
      <div>
        <h1>{tileName}</h1>
      </div>
      <FormHeader title="Tile" />
      <FormInput onChange={(t) => setTileName(t)} />
    </>

  );
};
export default TileForm;
