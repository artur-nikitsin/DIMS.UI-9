import { getMembers, getDirections } from '../../firebase/apiGet';
import { catchReceiveDataError } from './errorReducer';

const SET_MEMBERS = 'SET_MEMBERS';
const SET_DIRECTIONS = 'SET_DIRECTIONS';
const SET_ACTIVE_USER_ID = 'SET_ACTIVE_USER_ID';
const SET_ACTIVE_USER_NAME = 'SET_ACTIVE_USER_NAME';
const SET_LOADING = 'SET_LOADING';
const SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN';
const SET_MODAL_TYPE = 'SET_MODAL_TYPE';

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setDirections = (directions) => ({ type: SET_DIRECTIONS, directions });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setActiveUserId = (activeUserId) => ({ type: SET_ACTIVE_USER_ID, activeUserId });
export const setActiveUserName = (activeUserName) => ({ type: SET_ACTIVE_USER_NAME, activeUserName });
export const setModal = (modalIsOpen) => ({ type: SET_MODAL_IS_OPEN, modalIsOpen });
export const setModalType = (modalType) => ({ type: SET_MODAL_TYPE, modalType });

const initialState = {
  loading: true,
  members: [],
  directions: [],
  activeUserId: null,
  activeUserName: null,
  modalIsOpen: false,
  modalType: null,
};

export const getAllMembers = () => (dispatch) => {
  dispatch(setLoading(true));

  getMembers()
    .then((result) => {
      dispatch(setMembers(result));
      dispatch(setLoading(false));

      getDirections().then((result) => {
        dispatch(setDirections(result));
      });
    })
    .catch((error) => {
      dispatch(catchReceiveDataError(error));
    });
};

export const openModal = (activeUserId, modalType) => (dispatch) => {
  dispatch(setActiveUserId(activeUserId));
  dispatch(setModal(true));
  dispatch(setModalType(modalType));
};

export const closeModal = () => (dispatch) => {
  dispatch(setActiveUserId(null));
  dispatch(setModal(false));
  dispatch(setModalType(null));
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_MEMBERS:
      return { ...state, members: action.members };
    case SET_DIRECTIONS:
      return { ...state, directions: action.directions };
    case SET_ACTIVE_USER_ID:
      return { ...state, activeUserId: action.activeUserId };
    case SET_ACTIVE_USER_NAME:
      return { ...state, activeUserName: action.activeUserName };
    case SET_MODAL_IS_OPEN:
      return { ...state, modalIsOpen: action.modalIsOpen };
    case SET_MODAL_TYPE:
      return { ...state, modalType: action.modalType };
    default:
      return state;
  }
};

export default membersReducer;
