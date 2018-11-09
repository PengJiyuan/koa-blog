import fetch from 'libs/fetch';

export default {
  getBlogList() {
    return fetch.get('/api/blog/list').then((res) => {
      console.log(res);
      return res;
    });
  },
  logout() {
    return fetch.get('/api/logout');
  }
}
