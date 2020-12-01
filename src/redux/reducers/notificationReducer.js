import { notificationTypes } from '../../components/common/Messages/Notification/notificationTypes';

const { success } = notificationTypes;

const SET_NOTIFICATION_TYPE = 'SET_NOTIFICATION_TYPE';
const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
const SET_NOTIFICATION_IS_OPEN = 'SET_NOTIFICATION_IS_OPEN';

export const setNotificationIsOpen = (isShowed) => ({ type: SET_NOTIFICATION_IS_OPEN, isShowed });
export const setNotificationType = (notificationType) => ({ type: SET_NOTIFICATION_TYPE, notificationType });
export const setNotificationMessage = (message) => ({ type: SET_NOTIFICATION_MESSAGE, message });

const initialState = {
  isShowed: false,
  notificationType: '',
  message: '',
};

export const hideNotification = () => (dispatch) => {
  dispatch(setNotificationIsOpen(false));
  dispatch(setNotificationType(''));
  dispatch(setNotificationMessage(''));
};

export const setSuccessCreateUser = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('User successfully registered'));
};

export const setSuccessUpdateUser = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('User successfully updated'));
};

export const setSuccessDeleteUser = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('User successfully deleted'));
};

export const setSuccessCreateTask = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Task successfully created'));
};

export const setSuccessUpdateTask = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Task successfully updated'));
};

export const setSuccessDeleteTask = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Task successfully deleted'));
};

export const setSuccessCreateTrack = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Track successfully created'));
};

export const setSuccessUpdateTrack = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Track successfully updated'));
};

export const setSuccessDeleteTrack = () => (dispatch) => {
  dispatch(setNotificationType(success.type));
  dispatch(setNotificationIsOpen(true));
  dispatch(setNotificationMessage('Track successfully deleted'));
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_IS_OPEN:
      return { ...state, isShowed: action.isShowed };
    case SET_NOTIFICATION_MESSAGE:
      return { ...state, message: action.message };
    case SET_NOTIFICATION_TYPE:
      return { ...state, notificationType: action.notificationType };
    default:
      return state;
  }
};
export default notificationReducer;
