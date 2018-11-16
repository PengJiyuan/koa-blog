import { UPDATE_BLOG } from './action-type';
import request from '../request';

export const getBlogById = (id) => async dispatch => {
  try{
    const { blog } = await request.getBlogById(id);
    dispatch({
      type: UPDATE_BLOG,
      blog
    });
  } catch(err) {
    console.error(err);
  }
}