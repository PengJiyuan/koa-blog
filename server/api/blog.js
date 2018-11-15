const Blog = require('../models').blog;

class BlogController {
  // 博客列表
  static async getList(ctx) {
    ctx.body = await Blog.findAll();
  }

  // 发布博客
  static async publish(ctx) {
    const post = ctx.request.body;
    post.created_at = new Date();
    await Blog.create(post);
    ctx.body = {
      post
    };
  }

  // 根据id获取博客内容
  static async getBlogById(ctx) {
    const id = ctx.params.id;
    const blog = await Blog.findById(id);
    ctx.body = {
      blog
    };
  }
}

module.exports = BlogController;