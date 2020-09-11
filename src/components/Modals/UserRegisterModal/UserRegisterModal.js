import React from 'react';
import './userRegisterModal.scss';
import Modal from '../Common/Modal';
import UsersModalContent from '../Common/UsersModalContent';

class UserRegisterModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Modal modalContent={<UsersModalContent />} modalType='Register' closeModal={this.props.closeModal} />;
  }
}

export default UserRegisterModal;
