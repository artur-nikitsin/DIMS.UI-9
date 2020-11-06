const initialState = {
  receiveDataError: null,
  sendDataError: null,
  authError: null,
  errorMessage: '',
  errorCode: '',
};

const SET_RECEIVE_DATA_ERROR = 'SET_RECEIVE_DATA_ERROR';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_SEND_DATA_ERROR = 'SET_SEND_DATA_ERROR';
const SET_ERROR_CODE = 'SET_ERROR_CODE';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setReceiveDataError = (error) => ({ type: SET_RECEIVE_DATA_ERROR, error });
export const setAuthError = (error) => ({ type: SET_AUTH_ERROR, error });
export const setSendDataError = (error) => ({ type: SET_SEND_DATA_ERROR, error });
export const setErrorCode = (code) => ({ type: SET_ERROR_CODE, code });
export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, message });

export const catchReceiveDataError = ({ code, message }) => (dispatch) => {
  console.error(`Error receiving data: ${code}`);
  dispatch(setReceiveDataError({ code, message }));
  dispatch(setErrorCode(code));
  dispatch(setErrorMessage(message));
};

export const catchAuthError = ({ code, message }) => (dispatch) => {
  console.log('auth');
  console.log({ code, message });
  dispatch(setAuthError({ code, message }));
  dispatch(setErrorCode(code));
  dispatch(setErrorMessage(message));
};

export const catchSendDataError = (newError) => (dispatch) => {
  console.log('send');
  console.log(newError);
  dispatch(setSendDataError(newError));
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECEIVE_DATA_ERROR:
      return { ...state, receiveDataError: action.error };
    case SET_SEND_DATA_ERROR:
      return { ...state, sendDataError: action.error };
    case SET_AUTH_ERROR:
      return { ...state, authError: action.error };
    case SET_ERROR_CODE:
      return { ...state, errorMessage: action.error };
    case SET_ERROR_MESSAGE:
      return { ...state, errorCode: action.error };

    default:
      return state;
  }
};

export default errorReducer;
