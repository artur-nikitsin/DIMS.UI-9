const initialState = {
  receiveDataError: null,
  sendDataError: null,
  authError: null,
};

const SET_RECEIVE_DATA_ERROR = 'SET_RECEIVE_DATA_ERROR';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_SEND_DATA_ERROR = 'SET_SEND_DATA_ERROR';

export const setReceiveDataError = (error) => ({ type: SET_RECEIVE_DATA_ERROR, error });
export const setAuthError = (error) => ({ type: SET_AUTH_ERROR, error });
export const setSendDataError = (error) => ({ type: SET_SEND_DATA_ERROR, error });

export const catchReceiveDataError = (newError) => (dispatch) => {
  console.log(newError);
  dispatch(setReceiveDataError(newError));
};

export const catchAuthError = (newError) => (dispatch) => {
  console.log('auth');
  console.log(newError);
  dispatch(setAuthError(newError));
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
    default:
      return state;
  }
};

export default errorReducer;
