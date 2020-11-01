import React from 'react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import './modalContent.scss';
import PropTypes from 'prop-types';

function ModalContent({ handleSubmit, createInputList, closeModal, modalType }) {
  return (
    <div className='modalData'>
      <AvForm className='modalForm' onSubmit={handleSubmit}>
        {createInputList}
        <div className='modalButtons'>
          {modalType === 'view' || (
            <Button color='success' size='lg'>
              Submit
            </Button>
          )}
          <Button outline color='secondary' size='lg' onClick={closeModal}>
            Return
          </Button>
        </div>
      </AvForm>
    </div>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  createInputList: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
};
ModalContent.defaultProps = {
  modalType: '',
  createInputList: null,
};

export default ModalContent;
