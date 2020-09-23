import React from "react";
import "./modal.scss";
import Preloader from "../../common/Preloader/Preloader";

function Modal({ closeModal, loading, modalContent }) {

  return (
    <div className='modal'>
      <div className='closeModalArea' onClick={closeModal} />
      {loading ? (
        <Preloader />
      ) : (
        <div className='modalBody'>
          <button className='closeModalButton' onClick={closeModal}>
            x
          </button>
          {modalContent}
        </div>
      )}
    </div>
  );
}

export default Modal;
