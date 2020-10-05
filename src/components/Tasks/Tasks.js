import React from "react";
import "./tasks.scss";
import { getTasks } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import { deleteTask } from "../../firebase/apiDelete";

import TaskCreateModal from "../Modals/Task/TaskCreateModal/TaskCreateModal";
import TaskEditModal from "../Modals/Task/TaskEditModal/TaskEditModal";
import { Table } from "reactstrap";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null,
      showCreateModal: false,
      showEditModal: false,
      activeTaskId: null
    };
  }

  componentDidMount() {
    this.getTasks();
  }


  handleShowCreateTaskModal = () => {
    this.setState({
      showCreateModal: true
    });
  };


  handleEdit = (taskId) => () => {
    this.setState({
      showEditModal: true,
      activeTaskId: taskId
    });
  };

  handleDelete = (taskId) => () => {

    deleteTask(taskId)
      .then(() => {
        this.reloadTasksPage();
      });
  };


  handleCloseModal = () => {
    this.setState({
      showCreateModal: false,
      showEditModal: false
    });
  };


  reloadTasksPage = () => {
    this.setState({
      loading: true,
      tasks: null
    });
    this.getTasks();
  };

  closeModalAndReload = () => {
    this.setState({
      showCreateModal: false
    });
    this.handleCloseModal();
    this.reloadTasksPage();
  };

  getTasks = () => {
    getTasks().then((result) => {
      let tasks = result.map((task, i) => {
        return (
          <tr key={task.taskId + "z"} className={i % 2 ? "darkLine" : "whiteLine"}>
            <td key={task.taskId + "a"}>{i + 1}</td>
            <td key={task.taskId + "b"}>
              <a href=''>{task.name}</a>
            </td>
            <td key={task.taskId + "i"}>{new Date(task.startDate).toLocaleDateString()}</td>
            <td key={task.taskId + "j"}>{new Date(task.deadlineDate).toLocaleDateString()}</td>
            <td key={task.taskId + "h"}>

              <EditDeleteButtons handleEdit={this.handleEdit(task.taskId)}
                                 handleDelete={this.handleDelete(task.taskId)} />

            </td>
          </tr>
        );
      });

      if (this.state.tasks === null) {
        this.setState({
          loading: false,
          tasks: tasks
        });
      }
    });
  };

  taskCreateModal = (modalState) => {
    if (modalState) {
      return (
        <TaskCreateModal
          closeModal={this.handleCloseModal}
          closeModalAndReload={this.closeModalAndReload}
        />);
    }
  };

  taskEditModal = (modalState) => {
    if (modalState) {
      return (
        <TaskEditModal
          taskId={this.state.activeTaskId}
          closeModal={this.handleCloseModal}
          closeModalAndReload={this.closeModalAndReload}
        />
      );
    }
  };

  createTasksTable = () => {
    const tableHeaders = (
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Start</th>
        <th>Deadline</th>
        <th />
      </tr>
      </thead>
    );

    const { showCreateModal, showEditModal } = this.state;
    return (
      <div>
        {this.taskCreateModal(showCreateModal)}
        {this.taskEditModal(showEditModal)}
        <button className='taskCreateButton' onClick={this.handleShowCreateTaskModal}>
          Create
        </button>
        <Table striped className="tasksTable">
          {tableHeaders}
          <tbody>{this.state.tasks}</tbody>
        </Table>
      </div>
    );
  };

  render() {

    const { loading, showCreateModal } = this.state;

    return <div className='tasksTableContainer'>{loading ? <Preloader /> : this.createTasksTable()}</div>;

  }
}

export default Tasks;
