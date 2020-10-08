import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./trackModal.scss";
import { getTrack } from "../../../firebase/apiGet";
import { trackModalTemplate } from "./ModalInputsTemplate";
import TrackModalDataWorker from "./TrackModalDataWorker";

const TrackModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    trackId,
    taskName,
    reloadTrackPage,
    userTaskId
  } = props;

  const [trackData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("Register");

  const toggle = () => {
    closeModal(null);
    setData(null);
    setModalType("Register");
  };


  useEffect(() => {
    if (trackId) {
      setLoading(true);
      getTrack(trackId).then((result) => {
        setData(result);
        setLoading(false);
        setModalType("Edit");
      });
    } else {
      setData(null);
      setLoading(false);
      setModalType("Register");
    }
  }, [trackId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalBody>
          <ModalHeader> {taskName}</ModalHeader>
          <TrackModalDataWorker
            modalTemplate={trackModalTemplate}
            trackData={trackData}
            userTaskId={userTaskId}
            modalType={modalType}
            closeModal={toggle}
            reloadTrackPage={reloadTrackPage}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TrackModal;