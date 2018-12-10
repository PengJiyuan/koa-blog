import { USER_LIST } from './action-type';

export const userList = (state = { list: [], loading: true }, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        list: action.list || [],
        loading: action.loading
      };
    default:
      return state;
  }
};
