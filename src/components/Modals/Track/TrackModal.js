import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './trackModal.scss';
import PropTypes from 'prop-types';
import { getTrack } from '../../../firebase/apiGet';
import TrackModalDataWorker from './TrackModalDataWorker';
import Preloader from '../../common/Preloader/Preloader';

const TrackModal = (props) => {
  const { className, isOpen, closeModal, closeModalAndReload, trackId, taskName, modalType, userTaskId } = props;

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
          {loading ? (
            <Preloader />
          ) : (
            <>
              <ModalHeader>{`Task: ${taskName}`}</ModalHeader>
              <TrackModalDataWorker
                trackData={trackData}
                userTaskId={userTaskId}
                modalType={modalType}
                closeModal={useToggle}
                closeModalAndReload={closeModalAndReload}
              />
            </>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

TrackModal.propTypes = {
  className: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
  trackId: PropTypes.string,
  taskName: PropTypes.string,
  userTaskId: PropTypes.string,
};

TrackModal.defaultProps = {
  modalType: '',
  trackId: '',
  taskName: '',
  userTaskId: '',
};

export default TrackModal;
