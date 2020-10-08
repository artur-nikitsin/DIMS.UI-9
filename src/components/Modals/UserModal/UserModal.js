import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UsersModalDataWorker from "../User/UsersModalDataWorker";
import { userModalTemplate } from "../User/ModalInputsTemplate";
import "./UserModal.scss";
import { getMember } from "../../../firebase/apiGet";
import Preloader from "../../common/Preloader/Preloader";

const UserModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    userId,
    reloadMemberPage
  } = props;

  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("Register");


  const toggle = () => {
    closeModal(null);
    setData(null);
    setModalType("Register");
  };


  useEffect(() => {
    if (userId) {
      setLoading(true);
      getMember(userId).then((result) => {
        setData(result);
        setLoading(false);
        setModalType("Edit");
      });
    } else {
      setData(null);
      setLoading(false);
      setModalType("Register");
    }
  }, [userId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalBody>
          <UsersModalDataWorker
            modalTemplate={userModalTemplate}
            userData={userData}
            modalType={modalType}
            closeModal={toggle}
            reloadMemberPage={reloadMemberPage}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserModal;