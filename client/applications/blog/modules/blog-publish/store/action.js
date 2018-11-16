import { PUBLISH_BLOG } from './action-type';
import request from '../request';

export const updateList = () => async dispatch => {
  try{
    const list = await request.getBlogList();
    dispatch({
      type: PUBLISH_BLOG,
      list
    });
  } catch(err) {
    console.error(err);
  }
}