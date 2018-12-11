const User = require('../../../models').user;

class UserController {
  // 用户列表
  static async getUser(ctx) {
    const { id } = ctx.request.query;
    ctx.body = {
      user: await User.findOne({
        where: {
          id
        },
        attributes: { exclude: ['password'] }
      })
    };
  }

  // 用户列表
  static async updateUser(ctx) {
    const { id } = ctx.request.query;
    const { body } = ctx.request;
    ctx.body = {
      user: await User.update(body, {
        where: {
          id
        }
      })
    };
  }
}

module.exports = UserController;
