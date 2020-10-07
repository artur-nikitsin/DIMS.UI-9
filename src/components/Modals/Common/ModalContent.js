import React from "react";
import { AvForm } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import "./modalContent.scss"

function ModalContent({ handleSubmit, createInputList, closeModal }) {
  return (
    <div className='modalData'>
      <AvForm className="modalForm" onSubmit={handleSubmit}>
        {createInputList}
        <div className='modalButtons'>
          <Button color="success" size="lg">Submit</Button>
          <Button outline color="secondary" size="lg" onClick={closeModal}>
            Return to grid
          </Button>
        </div>
      </AvForm>
    </div>
  );
}

export default ModalContent;