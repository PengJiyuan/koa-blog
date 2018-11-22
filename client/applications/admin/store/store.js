import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as userList from '../modules/user-list/store/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({
    ...userList
  }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log('state发生了改变，现在为：', store.getState());
});

export default store;