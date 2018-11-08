import ky from 'ky';

export default {
  async getBlogList() {
    return await ky.get('/api/blog/list').json();
  }
}
