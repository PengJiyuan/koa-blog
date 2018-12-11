const User = require('../../../models').user;
const Settings = require('../../../models').settings;

class UserController {
  // 获取用户信息
  static async getUser(ctx) {
    const { id } = ctx.request.query;
    const user = await User.findOne({
      where: {
        id
      },
      attributes: { exclude: ['password'] }
    });
    const setting = await Settings.findOne({
      where: {
        user_id: id
      }
    });
    ctx.body = {
      user,
      setting
    };
  }

  // 更新用户
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

  // 更新用户配置
  static async updateSetting(ctx) {
    const userId = ctx.request.query.user_id;
    const { body } = ctx.request;
    ctx.body = {
      setting: await Settings.update(body, {
        where: {
          user_id: userId
        }
      })
    };
  }

  static async uploadAvatar(ctx) {
    const file = ctx.req.file;
    const url = `/upload/${file.filename}`;
    ctx.body = {
      ...file,
      url
    };
  }

  static async uploadBackgroundImg(ctx) {
    const file = ctx.req.file;
    const url = `/upload/${file.filename}`;
    ctx.body = {
      ...file,
      url
    };
  }
}

module.exports = UserController;
