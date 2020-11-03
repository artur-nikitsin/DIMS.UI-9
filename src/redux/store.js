import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import membersReducer from './reducers/membersReducer';
import tasksReducer from './reducers/tasksReducer';

const reducers = combineReducers({
  members: membersReducer,
  tasks: tasksReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
