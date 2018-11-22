import { USER_LIST } from './action-type';
import request from '../request';

// 获取列表保存至store
export const updateList = () => async dispatch => {
  try {
    dispatch({
      type: USER_LIST,
      loading: true
    });
    const list = await request.getUserList();
    dispatch({
      type: USER_LIST,
      list,
      loading: false
    });
  } catch(err) {
    console.error(err);
  }
};
