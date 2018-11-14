import fetch from 'libs/fetch';

export default {
  getBlogById(id) {
    return fetch.get(`/api/blog/${id}`);
  }
}
