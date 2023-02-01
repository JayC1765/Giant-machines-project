import React, { useState } from 'react';
import Form from './Form';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className='open-modal-button' onClick={() => setIsOpen(true)}>
        Add Entry
      </button>
      {isOpen && (
        <div className='modal'>
          <Form setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
};

export default Modal;
