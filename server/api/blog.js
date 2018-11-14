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

  // 发布博客
  static async publish(ctx) {
    async function insert(data) {
      const sql = 'INSERT INTO post SET ?';
      await query(sql, data);
    }
    const post = ctx.request.body;
    post.created_at = new Date();
    await insert(post);
    ctx.body = {
      post
    };
  }

  // 根据id获取博客内容
  static async getBlogById(ctx) {
    async function getPostById(id) {
      const sql = `SELECT * FROM post where id=${id}`;
      return await query(sql);
    }
    const id = ctx.params.id;
    const post = await getPostById(id);
    ctx.body = {
      blog: post[0]
    };
  }
}

module.exports = BlogController;