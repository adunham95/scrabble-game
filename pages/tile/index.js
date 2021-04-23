import React, { useState } from 'react';
import { FormModal } from '../../components/Form/FormModal';
import { ToggleContent } from '../../components/Modal/modal';
import TileForm from '../../components/Tile/tileForm';

const Tile = () => {
  const [modalID, setModalID] = useState('');

  return (
    <div>
      <ToggleContent
        toggle={(show) => <button onClick={show}>Show</button>}
        content={(hide) => (
          <FormModal close={hide}>
            <TileForm />
          </FormModal>
        )}
      />
    </div>
  );
};

export default Tile;
