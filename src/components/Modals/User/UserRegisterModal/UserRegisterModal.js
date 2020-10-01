import React from "react";
import "./userRegisterModal.scss";
import Modal from "../../Common/Modal";
import UsersModalDataWorker from "../UsersModalDataWorker";
import { userModalTemplate } from "../ModalInputsTemplate";

class UserRegisterModal extends React.Component {

  render() {

    const { closeModal, closeModalAndReload } = this.props;

    return (
      <Modal
        dataWorker={
          <UsersModalDataWorker
            modalTemplate={userModalTemplate}
            userData={null}
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
