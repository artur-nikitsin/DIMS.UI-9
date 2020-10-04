import React from "react";
import Modal from "../../Common/Modal";
import { getMember, getTask } from "../../../../firebase/apiGet";
import TaskModalDataWorker from "../TaskModalDataWorker";
import { taskModalTemplate } from "../ModalInputsTemplate";


class TaskEditModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taskData: null,
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.taskId) {
      getTask(this.props.taskId).then((result) => {

        this.setState({
          taskData: result,
          loading: false
        });
      });
    } else {
      this.state = {
        taskData: null,
        loading: false
      };
    }

  }


  render() {

    const { taskData, loading } = this.state;
    const { taskId, closeModal, closeModalAndReload } = this.props;
    return (
      <Modal
        dataWorker={
          <TaskModalDataWorker
            modalTemplate={taskModalTemplate}
            taskData={taskData}
            modalType='Edit'
            closeModal={closeModal}
            closeModalAndReload={closeModalAndReload}
          />
        }
        loading={loading}
        closeModal={closeModal}
      />
    );
  }
}

export default TaskEditModal;
