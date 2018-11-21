import { UPDATE_LIST } from './action-type';

export const blogList = (state = {list: [], loading: true}, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {
        list: action.list,
        loading: action.loading
      };
    default:
      return state;
  }
}
