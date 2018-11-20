const Blog = require('../../../models').blog;
const path = require('path');

class BlogController {
  // 博客列表
  static async getList(ctx) {
    ctx.body = await Blog.findAll();
  }

  // 根据id获取博客内容
  static async getBlogById(ctx) {
    const id = ctx.params.id;
    const blog = await Blog.findByPk(id);
    ctx.body = {
      blog
    };
  }

  // 发布博客
  static async publishBlog(ctx) {
    const post = ctx.request.body;
    post.created_at = new Date();
    post.user_id = ctx.state.user.id;
    post.username = ctx.state.user.username;
    await Blog.create(post);
    ctx.body = {
      post
    };
  }

  // 修改博客
  static async updateBlog(ctx) {
    const { id } = ctx.request.query;
    const { body } = ctx.request;
    await Blog.update(body, {
      where: {
        id
      }
    });
    ctx.body = {
      id,
      ...body
    };
  }

  // 删除博客
  static async deleteBlog(ctx) {
    const { id } = ctx.request.query;
    await Blog.destroy({
      where: {
        id
      }
    });
    ctx.body = {
      success: true
    };
  }

  static async uploadFile(ctx) {
    const file = ctx.req.file;
    const uuid = ctx.req.body.uuid;
    const url = `/upload/${file.filename}`;
    ctx.body = {
      ...file,
      uuid,
      url
    };
  }
}

module.exports = BlogController;
