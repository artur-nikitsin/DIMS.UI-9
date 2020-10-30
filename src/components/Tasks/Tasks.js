import React from 'react';
import './tasks.scss';
import { Table, Button } from 'reactstrap';
import { getAllTasks } from '../../firebase/apiGet';
import Preloader from '../common/Preloader/Preloader';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';
import { deleteTask } from '../../firebase/apiDelete';
import TaskModal from '../Modals/Task/TaskModal';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import { ThemeContext } from '../../contexts/ThemeContext';
import changeReactstrapColor from '../helpers/changeReactstrapColor/changeReactstrapColor';

class Tasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: null,
      modalIsOpen: false,
      activeTaskId: null,
      modalType: null,
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  handleDelete = (taskId) => () => {
    deleteTask(taskId).then(() => {
      this.reloadTasksPage();
    });
  };

  reloadTasksPage = () => {
    this.setState({
      loading: true,
      tasks: null,
    });
    this.getTasks();
  };

  getTasks = () => {
    getAllTasks().then((result) => {
      const tasks = result.map((task, i) => {
        return (
          <tr key={`${task.taskId}z`}>
            <td key={`${task.taskId}a`}>{i + 1}</td>
            <td key={`${task.taskId}b`}>
              <Button
                color='link'
                onClick={(event) => {
                  event.preventDefault();
                  this.openModal(task.taskId, 'view')();
                }}
              >
                {task.name}
              </Button>
            </td>
            <td key={`${task.taskId}i`} className='collapsed'>
              {getLocaleDate(task.startDate)}
            </td>
            <td key={`${task.taskId}j`} className='collapsed'>
              {getLocaleDate(task.deadlineDate)}
            </td>
            <td className='minRow'>
              <ul className='tableInfo'>
                <li>{`Start date: ${getLocaleDate(task.startDate)}`}</li>
                <hr />
                <li>{`Deadline date: ${getLocaleDate(task.deadlineDate)}`}</li>
                <hr />
              </ul>
            </td>
            <td key={`${task.taskId}h`}>
              <EditDeleteButtons
                handleEdit={this.openModal(task.taskId, 'edit')}
                handleDelete={this.handleDelete(task.taskId)}
              />
            </td>
          </tr>
        );
      });

      if (!this.state.tasks) {
        this.setState({
          loading: false,
          tasks,
        });
      }
    });
  };

  openModal = (activeTaskId, modalType) => () => {
    this.setState({
      modalIsOpen: true,
      activeTaskId,
      modalType,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      activeTaskId: null,
    });
  };

  closeModalAndReload = () => {
    this.closeModal();
    this.reloadTasksPage();
  };

  createTasksTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th className='collapsed'>Start</th>
          <th className='collapsed'>Deadline</th>
          <th className='minRow'> Information</th>
          <th />
        </tr>
      </thead>
    );

    const { tasks, modalIsOpen, activeTaskId, modalType } = this.state;
    const { theme } = this.context;
    return (
      <>
        <TaskModal
          className={`${theme} taskModal`}
          buttonLabel='TaskModal'
          isOpen={modalIsOpen}
          closeModal={this.closeModal}
          taskId={activeTaskId}
          modalType={modalType}
          closeModalAndReload={this.closeModalAndReload}
        />
        <Button
          outline
          color={changeReactstrapColor(theme)}
          className='taskCreateButton'
          onClick={this.openModal(null, 'register')}
        >
          Create
        </Button>
        <Table striped className={`${theme} tasksTable`}>
          {tableHeaders}
          <tbody>{tasks}</tbody>
        </Table>
      </>
    );
  };

  render() {
    const { loading } = this.state;
    return <div className='tasksTableContainer'>{loading ? <Preloader /> : this.createTasksTable()}</div>;
  }
}

Tasks.contextType = ThemeContext;
export default Tasks;
