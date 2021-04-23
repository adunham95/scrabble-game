import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({
  children, close, modalClass, position = 'center', customClose = false,
}) => {
  const setPosition = () => {
    if (position === 'center') {
      return styles.modalCenter;
    }
    if (position === 'bottom') {
      return styles.modalBottom;
    }
    if (position === 'top') {
      return styles.modalTop;
    }
    return '';
  };

  return (
    ReactDOM.createPortal(
      <div className={`${setPosition()} ${styles.modal} ${modalClass}`}>
        {children}
        {
          !customClose && (
          <button
            className="modal-close"
            onClick={() => close()}
          >
            Close
          </button>
          )
        }
      </div>,
      document.getElementById('modal-root'),
    )
  );
};

const ToggleContent = ({
  toggle, isOpen, content, modalClass,
}) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => { setIsShown(false); };
  const show = () => { setIsShown(true); };
  useEffect(() => {
    console.log(isOpen);
    setIsShown(isOpen);
  }, [isOpen]);
  return (
    <>
      {toggle(show, hide, isShown)}
      {isShown && content(hide, modalClass)}
    </>
  );
};

export { Modal, ToggleContent };
