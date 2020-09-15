import React from 'react';
import './userRegisterModal.scss';
import Modal from '../Common/Modal';
import UsersModalDataWorker from '../Common/UsersModalDataWorker';

class UserRegisterModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        modalContent={
          <UsersModalDataWorker
            modalType='Register'
            closeModal={this.props.closeModal}
            closeModalAndReload={this.props.closeModalAndReload}
          />
        }
        closeModal={this.props.closeModal}
      />
    );
  }
}

export default UserRegisterModal;
