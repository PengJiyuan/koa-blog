import { UPDATE_BLOG } from './action-type';

export const blogContent = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BLOG:
      return action.blog;
    default:
      return state;
  }
}
