import { bindActionCreators } from 'redux';
import { catchReceiveDataError, catchAuthError, catchSendDataError } from '../redux/reducers/errorReducer';
import store from '../redux/store';

const { dispatch } = store;

export const setReceiveDataErrorToStore = bindActionCreators(catchReceiveDataError, dispatch);
export const setAuthErrorToStore = bindActionCreators(catchAuthError, dispatch);
export const setSendDataErrorToStore = bindActionCreators(catchSendDataError, dispatch);
