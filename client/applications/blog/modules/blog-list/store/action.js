import { UPDATE_LIST } from './action-type';
import request from '../request';

// 获取列表保存至store
export const updateList = () => async (dispatch, getState) => {
  try{
    const list = await request.getBlogList();
    dispatch({
      type: UPDATE_LIST,
      list
    });
  } catch(err) {
    console.error(err);
  }
}