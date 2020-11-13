import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import UsersModalDataWorker from './UsersModalDataWorker';
import { userModalDefaultValid } from '../Common/ModalInputsTemplate';
import './UserModal.scss';
import { getMember } from '../../../firebase/apiGet';
import Preloader from '../../common/Preloader/Preloader';

const UserModal = (props) => {
  const { className, isOpen, closeModal, userId, modalType, closeModalAndReload } = props;

  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const newUser = () => {
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getMember(userId).then((result) => {
        setData(result);
        setLoading(false);
      });
    } else {
      newUser();
    }
  }, [userId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={closeModal} className={className}>
        <ModalBody>
          {loading ? (
            <Preloader />
          ) : (
            <UsersModalDataWorker
              modalTemplate={userModalDefaultValid}
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
  modalType: 'view',
};

export default UserModal;
