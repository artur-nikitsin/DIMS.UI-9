import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./trackModal.scss";
import { getTrack } from "../../../firebase/apiGet";
import { trackModalTemplate } from "../Common/ModalInputsTemplate";
import TrackModalDataWorker from "./TrackModalDataWorker";
import PropTypes from "prop-types";


const TrackModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    closeModalAndReload,
    trackId,
    taskName,
    modalType,
    userTaskId
  } = props;

  const [trackData, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  const useToggle = () => {
    setData(null);
    closeModal();
  };


  const newTrack = () => {
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (trackId) {
      setLoading(true);
      getTrack(trackId).then((result) => {
        setData(result);
        setLoading(false);
      });
    } else {
      newTrack();
    }
  }, [trackId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={useToggle} className={className}>
        <ModalBody>
          <ModalHeader> {taskName}</ModalHeader>
          <TrackModalDataWorker
            modalTemplate={trackModalTemplate}
            trackData={trackData}
            userTaskId={userTaskId}
            modalType={modalType}
            closeModal={useToggle}
            closeModalAndReload={closeModalAndReload}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

TrackModal.propTypes = {
  className: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
  trackId: PropTypes.string,
  taskName: PropTypes.string,
  userTaskId: PropTypes.string
};

export default TrackModal;