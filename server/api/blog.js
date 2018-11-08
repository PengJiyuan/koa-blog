const { query } = require('../mysql/query');

class BlogController {
  // 博客列表
  static async getList(ctx) {
    async function selectAllBlogs() {
      const sql = 'SELECT * FROM post';
      return await query(sql);
    }
    ctx.body = await selectAllBlogs();
  }
}

module.exports = BlogController;