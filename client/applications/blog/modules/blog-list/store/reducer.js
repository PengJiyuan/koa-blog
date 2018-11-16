import { UPDATE_LIST } from './action-type';

export const blogList = (state = [], action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return action.list;
    default:
      return state;
  }
}
