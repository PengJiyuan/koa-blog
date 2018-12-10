import fetch from 'libs/fetch';

export default {
  getBlogList() {
    return fetch.get('/api/blog');
  },
  deleteBlog(id) {
    return fetch.delete(`/api/blog?id=${id}`);
  }
};
