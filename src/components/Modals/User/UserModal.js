import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UsersModalDataWorker from "./UsersModalDataWorker";
import { userModalTemplate } from "../Common/ModalInputsTemplate";
import "./UserModal.scss";
import { getMember } from "../../../firebase/apiGet";
import PropTypes from "prop-types";


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


  const toggle = () => {
    closeModal(null);
    setData(null);
  };


  useEffect(() => {
    if (userId) {
      setLoading(true);
      getMember(userId).then((result) => {
        setData(result);
        setLoading(false);
      });
    } else {
      setData(null);
      setLoading(false);
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