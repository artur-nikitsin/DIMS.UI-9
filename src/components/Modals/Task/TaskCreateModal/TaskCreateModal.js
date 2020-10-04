import React from "react";
import "./taskCreateModal.scss";
import Modal from "../../Common/Modal";
import TaskModalDataWorker from "../TaskModalDataWorker";
import { taskModalTemplate } from "../ModalInputsTemplate";


class TaskCreateModal extends React.Component {

  render() {

    const { closeModal, closeModalAndReload } = this.props;

    return (
      <Modal
        dataWorker={
          <TaskModalDataWorker
            modalTemplate={taskModalTemplate}
            taskData={null}
            modalType='Create'
            closeModal={closeModal}
            closeModalAndReload={closeModalAndReload}
          />
        }
        closeModal={closeModal}
      />
    );
  }
}

export default TaskCreateModal;
