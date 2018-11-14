import fetch from 'libs/fetch';

export default {
  publish(data) {
    return fetch.post('/api/publish', {
      body: data
    });
  }
}
