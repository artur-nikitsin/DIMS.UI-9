import React from "react";
import "./tasks.scss";
import { getTasks } from "../../firebase/apiGet";
import Preloader from "../common/Preloader/Preloader";
import EditDeleteButtons from "../common/Buttons/EditDeleteButtons/EditDeleteButtons";
import { deleteTask } from "../../firebase/apiDelete";
import { Table, Button } from "reactstrap";
import TaskModal from "../Modals/Task/TaskModal";


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null,
      modalIsOpen: false,
      activeTaskId: null
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  handleDelete = (taskId) => () => {
    deleteTask(taskId)
      .then(() => {
        this.reloadTasksPage();
      });
  };


  reloadTasksPage = () => {
    this.setState({
      loading: true,
      tasks: null
    });
    this.getTasks();
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

              <EditDeleteButtons
                handleEdit={this.openModal(task.taskId)}
                handleDelete={this.handleDelete(task.taskId)} />

            </td>
          </tr>
        );
      });

      if (!this.state.tasks) {
        this.setState({
          loading: false,
          tasks: tasks
        });
      }
    });
  };


  openModal = (taskId) => () => {
    this.setState({
      modalIsOpen: true,
      activeTaskId: taskId
    });
  };

  closeModal = (taskId) => {
    this.setState({
      modalIsOpen: false,
      activeTaskId: taskId
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

    const { tasks, modalIsOpen, activeTaskId } = this.state;
    return (
      <div>
        <TaskModal className="taskModal"
                   buttonLabel="TaskModal"
                   isOpen={modalIsOpen}
                   closeModal={this.closeModal}
                   taskId={activeTaskId}
                   reloadTaskPage={this.reloadTasksPage}
        />
        <Button outline color="primary" className='taskCreateButton' onClick={this.openModal(null)}>
          Create
        </Button>
        <Table striped className="tasksTable">
          {tableHeaders}
          <tbody>{tasks}</tbody>
        </Table>
      </div>
    );
  };

  render() {

    const { loading } = this.state;

    return (
      <div className='tasksTableContainer'>
        {loading ? <Preloader />
          : this.createTasksTable()}
      </div>
    );

  }
}

export default Tasks;
