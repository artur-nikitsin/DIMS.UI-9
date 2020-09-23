import React from "react";
import "./tasks.scss";
import { getTasks } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import TaskCreateModal from "../Modals/Tasks/TaskCreateModal/TaskCreateModal";
import { deleteTask } from "../../firebase/apiDelete";
import Buttons from "../Members/Buttons/Buttons";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null,
      showCreateModal: false
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


  handleEdit = (userId) => () => {
    console.log("edit");
    /*this.setState({
      showEditModal: true,
      activeUserId: userId
    });*/
  };

  handleDelete = (taskId) => () => {

    deleteTask(taskId)
      .then((status) => {
        if (status === "OK") {
          this.reloadTasksPage();
        }
      });
  };

  taskCreateModal = (modalState) => {
    if (modalState) {
      return (
        <TaskCreateModal closeModal={this.handleCloseModal}
                         closeModalAndReload={this.closeModalAndReload} />
      );
    } else return null;
  };


  handleCloseModal = () => {
    this.setState({
      showCreateModal: false
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
    this.reloadMembersPage();
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

    return (
      <div>
        <button className='taskCreateButton' onClick={this.handleShowCreateTaskModal}>
          Create
        </button>
        {this.taskCreateModal(this.state.showCreateModal)}
        <table className={"tasksTable"}>
          {tableHeaders}
          <tbody>{this.state.tasks}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return (
      <div className={"tasksTableContainer"}>
        {this.state.loading ? <Preloader /> : this.createTasksTable()}
      </div>
    );
  }
}

export default Tasks;
