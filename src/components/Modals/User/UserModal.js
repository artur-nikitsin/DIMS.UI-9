import React, { useState, useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UsersModalDataWorker from './UsersModalDataWorker';
import './UserModal.scss';
import { getMember } from '../../../firebase/apiGet';
import Preloader from '../../common/Preloader/Preloader';
import { ThemeContext } from '../../../contexts/ThemeContext';

const UserModal = (props) => {
  const { className, isOpen, closeModal, userId, modalType, closeModalAndReload } = props;

  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);

  const newUser = () => {
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getMember(userId)
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch();
    } else {
      newUser();
    }
  }, [userId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={closeModal} className={`${theme} ${className}`}>
        <ModalHeader toggle={closeModal}>{`User ${modalType} `}</ModalHeader>
        <ModalBody>
          {loading ? (
            <Preloader />
          ) : (
            <UsersModalDataWorker
              userData={userData}
              modalType={modalType}
              closeModal={closeModal}
              closeModalAndReload={closeModalAndReload}
            />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

UserModal.propTypes = {
  className: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userId: PropTypes.string,
  closeModalAndReload: PropTypes.func.isRequired,
};

UserModal.defaultProps = {
  userId: '',
  modalType: '',
};

export default UserModal;
