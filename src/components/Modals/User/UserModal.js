import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UsersModalDataWorker from "./UsersModalDataWorker";
import { userModalTemplate } from "../Common/ModalInputsTemplate";
import "./UserModal.scss";
import { getMember } from "../../../firebase/apiGet";
import PropTypes from "prop-types";
import Preloader from "../../common/Preloader/Preloader";


const UserModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    userId,
    modalType,
    closeModalAndReload
  } = props;

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
          {loading ? <Preloader /> :
            <UsersModalDataWorker
              modalTemplate={userModalTemplate}
              userData={userData}
              modalType={modalType}
              closeModal={closeModal}
              closeModalAndReload={closeModalAndReload}
            />}
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
  closeModalAndReload: PropTypes.func.isRequired
};

export default UserModal;