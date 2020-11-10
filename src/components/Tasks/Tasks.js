import React from 'react';
import './tasks.scss';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Preloader from '../common/Preloader/Preloader';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';
import { deleteTask } from '../../firebase/apiDelete';
import TaskModal from '../Modals/Task/TaskModal';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import { ThemeContext } from '../../contexts/ThemeContext';
import getThemeColor from '../helpers/getThemeColor/getThemeColor';
import NoDataMessage from '../common/Messages/NoDataMessage/NoDataMessage';

class Tasks extends React.PureComponent {
  componentDidMount() {
    this.reloadTasksPage();
  }

  handleDelete = (taskId) => () => {
    const { setSuccessDeleteTask } = this.props;
    deleteTask(taskId).then(() => {
      this.reloadTasksPage();
      setSuccessDeleteTask();
    });
  };

  reloadTasksPage = () => {
    const { getTasks } = this.props;
    getTasks();
  };

  openModal = (activeTaskId, modalType) => () => {
    const { openTaskModal } = this.props;
    openTaskModal(activeTaskId, modalType);
  };

  closeModal = () => {
    const { closeTaskModal } = this.props;
    closeTaskModal();
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

    const { modalIsOpen, activeTaskId, modalType } = this.props;
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
          color={getThemeColor(theme)}
          className='taskCreateButton'
          onClick={this.openModal(null, 'create')}
        >
          Create
        </Button>
        {this.tasksTable().length ? (
          <Table striped className={`${theme} tasksTable`}>
            {tableHeaders}
            <tbody>{this.tasksTable()}</tbody>
          </Table>
        ) : (
          <NoDataMessage text='Nothing to show. You can create first task' />
        )}
      </>
    );
  };

  tasksTable() {
    const { tasks } = this.props;
    const table = tasks.map((task, i) => {
      return (
        <tr key={`${task.taskId}z`} className='tableLine'>
          <td key={`${task.taskId}a`}>{i + 1}</td>
          <td key={`${task.taskId}b`}>
            <Button color='link' onClick={this.openModal(task.taskId, 'view')}>
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
          <td key={`${task.taskId}h`} className='crud-buttons'>
            <EditDeleteButtons
              handleEdit={this.openModal(task.taskId, 'edit')}
              handleDelete={this.handleDelete(task.taskId)}
            />
          </td>
        </tr>
      );
    });
    return table;
  }

  render() {
    const { loading } = this.props;
    return <div className='tasksTableContainer'>{loading ? <Preloader /> : this.createTasksTable()}</div>;
  }
}

Tasks.contextType = ThemeContext;

Tasks.propTypes = {
  tasks: PropTypes.array,
  getAllMembers: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  loading: PropTypes.bool,
  role: PropTypes.string,
  theme: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  activeUserId: PropTypes.string,
  modalType: PropTypes.string,
};

Tasks.defaultProps = {
  tasks: [],
  getAllMembers: null,
  openModal: null,
  closeModal: null,
  loading: false,
  role: '',
  theme: 'light',
  modalIsOpen: false,
  activeUserId: '',
  modalType: 'view',
};
export default Tasks;
