import { UPDATE_BLOG } from './action-type';

export const blogContent = (state = {detail: {}, loading: true}, action) => {
  switch (action.type) {
    case UPDATE_BLOG:
      return {
        detail: action.blog,
        loading: action.loading
      };
    default:
      return state;
  }
}
