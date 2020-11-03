import { bindActionCreators } from 'redux';
import store from '../redux/store';
import { catchReceiveDataError, catchAuthError, catchSendDataError } from '../redux/reducers/errorReducer';

const { dispatch } = store;
export const setReceiveDataErrorToStore = bindActionCreators(catchReceiveDataError, dispatch);
export const setAuthErrorToStore = bindActionCreators(catchAuthError, dispatch);
export const setSendDataErrorToStore = bindActionCreators(catchSendDataError, dispatch);
