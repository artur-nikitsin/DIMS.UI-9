import React from "react";
import "./userRegisterModal.scss";
import Modal from "../Common/Modal";
import UsersModalDataWorker from "../Common/UsersModalDataWorker";
import { userModalTemplate } from "../Common/ModalInputsTemplate";

class UserRegisterModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { closeModal, closeModalAndReload } = this.props;

    return (
      <Modal
        modalContent={
          <UsersModalDataWorker
            modalTemplate={userModalTemplate}
            modalType='Register'
            closeModal={closeModal}
            closeModalAndReload={closeModalAndReload}
          />
        }
        closeModal={closeModal}
      />
    );
  }
}

export default UserRegisterModal;
