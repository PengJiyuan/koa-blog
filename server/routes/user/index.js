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
  router.put('/api/users', apiUser.updateUser);
  router.post('/api/uploadAvatar', uploadAvatar.single('avatar'), apiUser.uploadAvatar);

  async function user(ctx) {
    await ctx.render('../../client/public/views/user/user.ejs', { userInfo: ctx.state.user });
  }
}

module.exports = routeUser;
