import fetch from 'libs/fetch';

export default {
  getBlogList() {
    return fetch.get('/api/blog');
  },
  logout() {
    return fetch.get('/api/logout');
  }
}
