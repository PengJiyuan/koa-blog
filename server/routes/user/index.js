const multer = require('koa-multer');
const fs = require('fs-extra');
const path = require('path');
const config = require('../../config/config');
const apiUser = require('./controller');

const uploadPath = config.uploadPath;

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    fs.mkdirp(path.join(uploadPath, 'avatar'), (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, `avatar/${file.originalname}`);
      }
    });
  }
});

const uploadAvatar = multer({ storage: storageAvatar });

const storageBackgroundImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    fs.mkdirp(path.join(uploadPath, 'background-images'), (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, `background-images/${file.originalname}`);
      }
    });
  }
});

const uploadBackgroundImg = multer({ storage: storageBackgroundImg });

function routeUser(router) {
  router.use(['/user'], async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { statusCode: 403, errors: [{ message: '授权失败，请登录' }] };
    }
  });

  router.get('/user(/?.*)', user);
  router.get('/api/users', apiUser.getUser);
  // router.post('/api/user/create', apiUser.createUser);
  // 修改用户
  router.put('/api/users', apiUser.updateUser);
  // 修改用户配置
  router.put('/api/user/setting', apiUser.updateSetting);
  router.post('/api/uploadAvatar', uploadAvatar.single('avatar'), apiUser.uploadAvatar);
  router.post('/api/uploadBackgroundImg', uploadBackgroundImg.single('background_img'), apiUser.uploadBackgroundImg);

  async function user(ctx) {
    await ctx.render('../../client/public/views/user/user.ejs', { userInfo: ctx.state.user });
  }
}

module.exports = routeUser;
