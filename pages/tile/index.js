import React, { useState } from 'react';
import { FormModal } from '../../components/Form/FormModal';
import { Modal, ToggleContent } from '../../components/Modal/modal';

const Tile = () => {
  const [tileName, setTitleName] = useState();
  const [modalID, setModalID] = useState('');
  return (
    <div>
      <input />
      <ToggleContent
        toggle={(show) => <button onClick={show}>Show</button>}
        content={(hide) => (
          <Modal close={hide}>
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Id interdum velit laoreet id donec ultrices tincidunt arcu. Ultricies mi quis hendrerit dolor magna eget. Cras tincidunt lobortis feugiat vivamus. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Massa eget egestas purus viverra. Leo urna molestie at elementum eu. Lobortis mattis aliquam faucibus purus. Augue lacus viverra vitae congue eu consequat ac felis donec.

            </h1>
          </Modal>
        )}
      />
    </div>
  );
};

export default Tile;
