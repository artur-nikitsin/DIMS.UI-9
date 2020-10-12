import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UsersModalDataWorker from "./UsersModalDataWorker";
import { userModalTemplate } from "./ModalInputsTemplate";
import "./UserModal.scss";
import { getMember } from "../../../firebase/apiGet";
import Preloader from "../../common/Preloader/Preloader";
import PropTypes from "prop-types";
import TaskModal from "../Task/TaskModal";

const UserModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    userId,
    modalType,
    reloadMemberPage
  } = props;

  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
 /* const [modalType, setModalType] = useState("Register");*/


  const toggle = () => {
    closeModal(null);
    setData(null);
   /* setModalType("Register");*/
  };


  useEffect(() => {
    if (userId) {
      setLoading(true);
      getMember(userId).then((result) => {
        setData(result);
        setLoading(false);
       /* setModalType("Edit");*/
      });
    } else {
      setData(null);
      setLoading(false);
    /*  setModalType("Register");*/
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

UserModal.propTypes = {
  className: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userId: PropTypes.string,
  reloadMemberPage: PropTypes.func.isRequired
};

export default UserModal;