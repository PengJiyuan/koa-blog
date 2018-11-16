import { PUBLISH_BLOG } from './action-type';

export const blogList = (state = [], action) => {
  switch (action.type) {
    case PUBLISH_BLOG:
      return action.list;
    default:
      return state;
  }
}
