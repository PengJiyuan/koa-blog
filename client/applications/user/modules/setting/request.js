import fetch from 'libs/fetch';

export default {
  getUserList() {
    return fetch.get('/api/users');
  },
  createUser(body) {
    return fetch.post('/api/user/create', {
      body
    });
  }
};
