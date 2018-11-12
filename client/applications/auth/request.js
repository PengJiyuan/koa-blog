import fetch from 'libs/fetch';

export default {
  login(body) {
    return fetch.post('/api/login', {
      body
    });
  }
}
