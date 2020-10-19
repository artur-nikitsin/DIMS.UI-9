import { getMembers } from "../../firebase/apiGet";

const SET_MEMBERS = "SET_MEMBERS";
const SET_LOADING = "SET_LOADING";
const SET_ACTIVE_USER_ID = "SET_ACTIVE_USER_ID";
const SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN";
const SET_MODAL_TYPE = "SET_MODAL_TYPE";


export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setActiveUserId = (activeUserId) => ({ type: SET_ACTIVE_USER_ID, activeUserId });
export const setModal = (modalIsOpen) => ({ type: SET_MODAL_IS_OPEN, modalIsOpen });
export const setModalType = (modalType) => ({ type: SET_MODAL_TYPE, modalType });

const initialState = {
  loading: true,
  members: null,
  activeUserId: null,
  activeUserName: null,
  modalIsOpen: false,
  modalType: null
};

export const getAllMembers = () => (dispatch) => {
  getMembers().then((result) => {
    dispatch(setMembers(result));
  });
};


const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, members: action.members };
    default:
      return state;
  }
};

export default membersReducer;
