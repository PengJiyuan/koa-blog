import fetch from 'libs/fetch';

export default {
  publish(data) {
    return fetch.post('/api/publish', {
      body: data
    });
  },
  getBlogById(id) {
    return fetch.get(`/api/blog?id=${id}`);
  },
  updateBlog(id, body) {
    return fetch.put(`/api/publish?id=${id}`, {
      body
    });
  }
}
