import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./taskModal.scss";
import { getMember, getTask } from "../../../firebase/apiGet";
import Preloader from "../../common/Preloader/Preloader";
import TaskModalDataWorker from "./TaskModalDataWorker";
import { taskModalTemplate } from "./ModalInputsTemplate";
import PropTypes from "prop-types";
import ModalContent from "../Common/ModalContent";

const TaskModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    taskId,
    modalType,
    reloadTaskPage
  } = props;

  const [taskData, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    closeModal(null);
    setData(null);
  };


  useEffect(() => {
    if (taskId) {
      setLoading(true);
      getTask(taskId).then((result) => {
        setData(result);
        setLoading(false);
      });
    } else {
      setData(null);
      setLoading(false);
    }
  }, [taskId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalBody>
          <TaskModalDataWorker
            modalTemplate={taskModalTemplate}
            taskData={taskData}
            modalType={modalType}
            closeModal={toggle}
            reloadTaskPage={reloadTaskPage}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

TaskModal.propTypes = {
  className: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  reloadTaskPage: PropTypes.func
};
export default TaskModal;