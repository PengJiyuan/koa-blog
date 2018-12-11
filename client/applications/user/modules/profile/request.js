import fetch from 'libs/fetch';

export default {
  getUserList() {
    const user = window.userInfo;
    return fetch.get(`/api/users?id=${user.id}`);
  },
  updateUser(id, body) {
    return fetch.put(`/api/users?id=${id}`, {
      body
    });
  }
};
