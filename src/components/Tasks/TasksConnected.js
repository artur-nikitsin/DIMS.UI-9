import { connect } from 'react-redux';
import { closeTaskModal, getTasks, openTaskModal } from '../../redux/reducers/tasksReducer';
import Tasks from './Tasks';
import { setSuccessDeleteTask } from '../../redux/reducers/notificationReducer';

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

const TaskConnected = connect(mapStateToProps, {
  getTasks,
  openTaskModal,
  closeTaskModal,
  setSuccessDeleteTask,
})(Tasks);

export default TaskConnected;
