import React from 'react';
import './tasks.scss';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTasks } from '../../firebase/apiGet';
import Preloader from '../common/Preloader/Preloader';
import EditDeleteButtons from '../common/Buttons/EditDeleteButtons/EditDeleteButtons';
import { deleteTask } from '../../firebase/apiDelete';
import TaskModal from '../Modals/Task/TaskModal';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import { ThemeContext } from '../../contexts/ThemeContext';
import getThemeColor from '../helpers/getThemeColor/getThemeColor';
import { closeTaskModal, openTaskModal, getTasks } from '../../redux/reducers/tasksReducer';

class Tasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  handleDelete = (taskId) => () => {
    deleteTask(taskId).then(() => {
      this.reloadTasksPage();
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

    const { tasks, modalIsOpen, activeTaskId, modalType } = this.props;
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
        <Table striped className={`${theme} tasksTable`}>
          {tableHeaders}
          <tbody>{this.tasksTable()}</tbody>
        </Table>
      </>
    );
  };

  tasksTable() {
    const { tasks } = this.props;
    const table = tasks.map((task, i) => {
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
    return table;
  }

  render() {
    const { loading } = this.props;
    return <div className='tasksTableContainer'>{loading ? <Preloader /> : this.createTasksTable()}</div>;
  }
}

const mapStateToProps = (state) => {
  const { tasks, loading, activeTaskId, modalIsOpen, modalType } = state.tasks;
  return {
    tasks,
    loading,
    activeTaskId,
    modalIsOpen,
    modalType,
  };
};
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
Tasks.contextType = ThemeContext;
export default connect(mapStateToProps, {
  getTasks,
  openTaskModal,
  closeTaskModal,
})(Tasks);
