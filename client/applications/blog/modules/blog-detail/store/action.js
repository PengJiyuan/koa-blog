import { UPDATE_BLOG } from './action-type';
import request from '../request';

export const getBlogById = (id) => async dispatch => {
  try{
    dispatch({
      type: UPDATE_BLOG,
      blog: {},
      loading: true
    });
    const { blog } = await request.getBlogById(id);
    dispatch({
      type: UPDATE_BLOG,
      blog,
      loading: false
    });
  } catch(err) {
    console.error(err);
  }
}