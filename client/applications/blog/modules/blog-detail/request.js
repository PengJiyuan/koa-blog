import fetch from 'libs/fetch';

export default {
  getBlogById(uuid) {
    return fetch.get(`/api/blog/${uuid}`);
  }
}
