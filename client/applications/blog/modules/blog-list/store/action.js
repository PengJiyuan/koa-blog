import { UPDATE_LIST } from './action-type';
import request from '../request';

// 获取列表保存至store
export const updateList = () => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LIST,
      list: [],
      loading: true
    });
    const list = await request.getBlogList();
    dispatch({
      type: UPDATE_LIST,
      list,
      loading: false
    });
  } catch (err) {
    console.error(err);
  }
};
