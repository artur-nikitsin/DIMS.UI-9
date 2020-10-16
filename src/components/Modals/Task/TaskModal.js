import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./taskModal.scss";
import { getTask } from "../../../firebase/apiGet";
import TaskModalDataWorker from "./TaskModalDataWorker";
import { taskModalTemplate } from "../Common/ModalInputsTemplate";
import PropTypes from "prop-types";


const TaskModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    taskId,
    modalType,
    closeModalAndReload
  } = props;

  const [taskData, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const useToggle = () => {
    setData(null);
    closeModal();
  };

  const newTask = () => {
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (taskId) {
      setLoading(true);
      getTask(taskId).then((result) => {
        setData(result);
        setLoading(false);
      });
    } else {
      newTask();
    }
  }, [taskId]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={useToggle} className={className}>
        <ModalBody>
          <TaskModalDataWorker
            modalTemplate={taskModalTemplate}
            taskData={taskData}
            modalType={modalType}
            closeModal={useToggle}
            closeModalAndReload={closeModalAndReload}
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
  closeModalAndReload: PropTypes.func
};

export default TaskModal;