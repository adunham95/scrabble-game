import React from 'react';
import { Modal } from '../Modal/modal';

const FormModal = ({ children, modalClass }) => (
  <Modal
    customClose
    modalClass={`form ${modalClass}`}
  >
    {children}
  </Modal>
);

export { FormModal };
