import fetch from 'libs/fetch';

export default {
  login(data) {
    return fetch.post('/api/login', {
      data
    });
  }
}
