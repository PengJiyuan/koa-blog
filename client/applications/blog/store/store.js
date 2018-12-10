import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as blogList from '../modules/blog-list/store/reducer';
import * as blogDetail from '../modules/blog-detail/store/reducer';

const store = createStore(
  combineReducers({
    ...blogList,
    ...blogDetail
  }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log('state发生了改变，现在为：', store.getState());
});

export default store;
