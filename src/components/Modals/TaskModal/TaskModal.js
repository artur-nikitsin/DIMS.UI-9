import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./taskModal.scss";
import { getMember, getTask } from "../../../firebase/apiGet";
import Preloader from "../../common/Preloader/Preloader";
import TaskModalDataWorker from "../Task/TaskModalDataWorker";
import { taskModalTemplate } from "../Task/ModalInputsTemplate";

const TaskModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    closeModal,
    taskId,
    reloadTaskPage
  } = props;

  const [taskData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("Register");

  const toggle = () => {
    closeModal(null);
    setData(null);
    setModalType("Register");
  };


  useEffect(() => {
    if (taskId) {
      setLoading(true);
      getTask(taskId).then((result) => {
        setData(result);
        setLoading(false);
        setModalType("Edit");
      });
    } else {
      setData(null);
      setLoading(false);
      setModalType("Register");
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

export default TaskModal;