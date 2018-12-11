import fetch from 'libs/fetch';

export default {
  getUser() {
    const user = window.userInfo;
    return fetch.get(`/api/users?id=${user.id}`);
  },
  updateSetting(userId, body) {
    return fetch.put(`/api/user/setting?user_id=${userId}`, {
      body
    });
  }
};
