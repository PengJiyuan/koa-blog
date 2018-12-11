const User = require('../../../models').user;
const Settings = require('../../../models').settings;

class UserController {
  // 用户列表
  static async getList(ctx) {
    const { id } = ctx.request.query;
    if (id) {
      ctx.body = {
        user: await User.findOne({
          where: {
            id
          },
          attributes: { exclude: ['password'] }
        })
      };
    } else {
      ctx.body = await User.findAll({
        attributes: { exclude: ['password'] }
      });
    }
  }

  // 创建用户
  static async createUser(ctx) {
    const body = ctx.request.body;
    const user = await User.create(body);
    // 创建用户的同时生成用户默认配置单
    await Settings.create({
      user_id: user.id
    });
    ctx.body = {
      user
    };
  }
}

module.exports = UserController;
