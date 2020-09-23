import React from 'react';
import './userRegisterModal.scss';
import Modal from '../../Common/Modal';
import TaskModalDataWorker from "../TaskModalDataWorker";

class TaskCreateModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        modalContent={
          <TaskModalDataWorker
            modalType='Register'
            closeModal={this.props.closeModal}
            closeModalAndReload={this.props.closeModalAndReload}
          />
        }
        closeModal={this.props.closeModal}
      />
    );
  }
}

export default TaskCreateModal;
