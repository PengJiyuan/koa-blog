
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Model from './model';
import store from './store/store';
import './style/index.less';

ReactDOM.render(
  <Provider store={store}>
    <Model />
  </Provider>,
  document.getElementById('container')
);
