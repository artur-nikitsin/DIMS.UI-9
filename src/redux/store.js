import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import membersReducer from './reducers/membersReducer';

const reducers = combineReducers({
  members: membersReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
