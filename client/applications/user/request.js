import fetch from 'libs/fetch';

export default {
  logout() {
    return fetch.get('/api/logout');
  }
};
