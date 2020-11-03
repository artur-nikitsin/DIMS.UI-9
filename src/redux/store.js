import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import membersReducer from './reducers/membersReducer';
import tasksReducer from './reducers/tasksReducer';
import errorReducer from './reducers/errorReducer';

const reducers = combineReducers({
  members: membersReducer,
  tasks: tasksReducer,
  errors: errorReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
console.log(store.getState().errors);
export default store;
