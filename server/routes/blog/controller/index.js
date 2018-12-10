const Blog = require('../../../models').blog;
const path = require('path');
const fs = require('fs-extra');
const config = require('../../../config/config');

class BlogController {
  // 博客列表
  static async getList(ctx) {
    const { id } = ctx.request.query;
    if (!ctx.state.user) {
      ctx.body = [];
    } else {
      const userId = ctx.state.user.id;
      if (id) {
        ctx.body = {
          blog: await Blog.findOne({
            where: {
              id,
              user_id: userId
            }
          })
        }
      } else {
        ctx.body = await Blog.findAll({
          where: {
            user_id: userId
          }
        });
      }
    }
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
    const deleteOne = await Blog.findOne({
      where: {
        id
      }
    });
    // 删除对应博客的图片资源
    fs.removeSync(path.resolve(config.uploadPath, 'blog-images', deleteOne.mediaPrefix));
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

  static async uploadCover(ctx) {
    const file = ctx.req.file;
    const url = `/upload/${file.filename}`;
    ctx.body = {
      ...file,
      url
    };
  }
}

module.exports = BlogController;
