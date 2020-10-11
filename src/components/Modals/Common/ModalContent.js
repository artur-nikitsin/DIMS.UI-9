import React from "react";
import { AvForm } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import "./modalContent.scss";
import PropTypes from "prop-types";
import MemberTracks from "../../MemberTracks/MemberTracks";

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

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  createInputList: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export default ModalContent;