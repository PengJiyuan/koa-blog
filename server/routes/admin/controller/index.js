const User = require('../../../models').user;
const path = require('path');

class UserController {
  // 用户列表
  static async getList(ctx) {
    const { id } = ctx.request.query;
    if (id) {
      ctx.body = {
        user: await User.findOne({
          where: {
            id
          }
        })
      }
    } else {
      ctx.body = await User.findAll();
    }
  }

  // 创建用户
  static async createUser(ctx) {
    const body = ctx.request.body;
    const user = await User.create(body);
    ctx.body = {
      user
    };
  }
}

module.exports = UserController;
