import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import { FormButton } from '../Form/FormButton';
import { FormInput } from '../Form/FormInput';
import { FormHeader } from '../Form/FormText';

const tileDefault = {
  _id: '', name: '', points: 0,
};

const TileForm = ({
  tile = tileDefault, onSubmit = () => {},
}) => {
  const [tileData, setTileData] = useState(tileDefault);

  useEffect(() => {
    console.log('tile', tile);
    setTileData({ ...tileDefault, ...tile });
  }, [tile]);

  const updateTile = (value, field) => {
    const updatedTileData = { ...tileData };
    updatedTileData[field] = value;
    setTileData(updatedTileData);
  };

  const submit = async () => {
    console.log('submitting');
    onSubmit();

    // await client.resetStore();

    if (tileData.id === '') {
      console.log('Create Tag');
    }
    console.log('Update Tag');
  };

  return (
    <Form onSubmit={submit}>
      {/* <div>
        <h1>{tileData.name}</h1>
      </div> */}
      <FormHeader title="Tile" />
      <FormInput
        onChange={(t) => updateTile(t, 'name')}
        value={tileData.name}
      />
      <FormInput
        onChange={(t) => updateTile(t, 'points')}
        value={tileData.points}
      />
      <FormButton type="submit">
        Save
      </FormButton>
    </Form>

  );
};
export default TileForm;
