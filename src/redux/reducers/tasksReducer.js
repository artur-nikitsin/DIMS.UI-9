import { getAllTasks } from '../../firebase/apiGet';
import { setLoading } from './membersReducer';

const SET_TASKS = 'SET_TASKS';
const SET_LOADING = 'SET_LOADING';
const SET_ACTIVE_TASK_ID = 'SET_ACTIVE_TASK_ID';
const SET_TASK_MODAL_IS_OPEN = 'SET_TASK_MODAL_IS_OPEN';
const SET_TASK_MODAL_TYPE = 'SET_TASK_MODAL_TYPE';

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const setTasksLoading = (loading) => ({ type: SET_LOADING, loading });
export const setActiveTaskId = (activeTaskId) => ({ type: SET_ACTIVE_TASK_ID, activeTaskId });
export const setTaskModal = (modalIsOpen) => ({ type: SET_TASK_MODAL_IS_OPEN, modalIsOpen });
export const setTaskModalType = (modalType) => ({ type: SET_TASK_MODAL_TYPE, modalType });

const initialState = {
  loading: true,
  tasks: [],
  modalIsOpen: false,
  activeTaskId: null,
  modalType: null,
};

export const getTasks = () => (dispatch) => {
  dispatch(setLoading(true));
  getAllTasks()
    .then((result) => {
      dispatch(setTasks(result));
      dispatch(setTasksLoading(false));
    })
    .catch((error) => {
      console.error(`Error receiving data: ${error}`);
    });
};

export const openTaskModal = (activeTaskId, modalType) => (dispatch) => {
  dispatch(setActiveTaskId(activeTaskId));
  dispatch(setTaskModal(true));
  dispatch(setTaskModalType(modalType));
};

export const closeTaskModal = () => (dispatch) => {
  dispatch(setActiveTaskId(null));
  dispatch(setTaskModal(false));
  dispatch(setTaskModalType(null));
};
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_TASKS:
      return { ...state, tasks: action.tasks };
    case SET_ACTIVE_TASK_ID:
      return { ...state, activeTaskId: action.activeTaskId };
    case SET_TASK_MODAL_IS_OPEN:
      return { ...state, modalIsOpen: action.modalIsOpen };
    case SET_TASK_MODAL_TYPE:
      return { ...state, modalType: action.modalType };
    default:
      return state;
  }
};

export default tasksReducer;
