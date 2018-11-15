const { query } = require('../mysql/query');
const getUUID = require('../utils/nanoid');

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
    post.uuid = getUUID(12);
    post.created_at = new Date();
    await insert(post);
    ctx.body = {
      post
    };
  }

  // 根据id获取博客内容
  static async getBlogByUuid(ctx) {
    async function getPostByUuid(uuid) {
      const sql = `SELECT * FROM post WHERE uuid="${uuid}"`;
      return await query(sql);
    }
    const uuid = ctx.params.uuid;
    const post = await getPostByUuid(uuid);
    ctx.body = {
      blog: post[0]
    };
  }
}

module.exports = BlogController;