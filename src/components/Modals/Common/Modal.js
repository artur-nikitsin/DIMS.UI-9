import React from 'react';
import './modal.scss';
import Spinner from '../../common/Spinner/Spinner';

function Modal(props) {

  return (
    <div className='modal'>
      <div className='closeModalArea' onClick={props.closeModal}/>
      {props.loading ? (
        <Spinner/>
      ) : (
        <div className='modalBody'>
          <button className='closeModalButton' onClick={props.closeModal}>
            x
          </button>
          {props.modalContent}
        </div>
      )}
    </div>
  );
}

export default Modal;
