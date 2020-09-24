import React from "react";
import "./taskEditModal.scss";
import Modal from "../../Common/Modal";
import TaskModalDataWorker from "../TaskModalDataWorker";
import { getTask } from "../../../../firebase/apiGet";

class TaskEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskData: null,
      loading: true,
    };
  }


  componentDidMount() {
    getTask(this.props.taskId).then((result) => {
      this.setState({
        taskData: result,
        loading: false
      });
    });
  }

  render() {
    return (
      <Modal
        modalContent={
          <TaskModalDataWorker
            taskData={this.state.taskData}
            modalType='Edit'
            closeModal={this.props.closeModal}
            closeModalAndReload={this.props.closeModalAndReload} />
        }
        loading={this.state.loading}
        closeModal={this.props.closeModal}
        userId={this.props.userId}
      />
    );
  }
}

export default TaskEditModal;
