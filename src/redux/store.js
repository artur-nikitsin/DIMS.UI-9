import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import errorReducer from './reducers/errorReducer';
import membersReducer from './reducers/membersReducer';
import tasksReducer from './reducers/tasksReducer';
import notificationReducer from './reducers/notificationReducer';

const reducers = combineReducers({
  members: membersReducer,
  tasks: tasksReducer,
  errors: errorReducer,
  notifications: notificationReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export default store;
