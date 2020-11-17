import React, { useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UsersModalDataWorker from './UsersModalDataWorker';
import './UserModal.scss';
import { getMember } from '../../../firebase/apiGet';
import Preloader from '../../common/Preloader/Preloader';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { reducer, initialState, initState } from './userModalReducer';

const UserModal = (props) => {
  const { className, isOpen, closeModal, userId, modalType, closeModalAndReload } = props;

  const theme = useContext(ThemeContext);

  const [state, dispatch] = useReducer(reducer, initialState, initState);

  const setLoading = (loading) => {
    dispatch({ type: 'loading', loading: loading });
  };

  const setData = (data) => {
    dispatch({ type: 'data', data: data });
  };

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
        .catch((error) => {});
    } else {
      newUser();
    }
  }, [userId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={closeModal} className={`${theme} ${className}`}>
        <ModalHeader toggle={closeModal}>{`User ${modalType} `}</ModalHeader>
        <ModalBody>
          {state.loading ? (
            <Preloader />
          ) : (
            <UsersModalDataWorker
              userData={state.data}
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
