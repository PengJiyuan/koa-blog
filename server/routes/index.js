const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const passport = require('koa-passport');

function initRoutes(app) {
  // 只有登录之后的用户才可以进行发表博客
  router.use(['/api/publish'], async(ctx, next) => {
    if (ctx.state.user) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {statusCode: 403, errors: [{message: '授权失败，请登录'}]};
    }
  });

  fs.readdirSync(path.join(__dirname))
    .filter(dir => dir !== 'index.js')
    .forEach(app => {
      const models = fs.statSync(path.join(__dirname, app));
      if (models.isDirectory()) {
        require(path.join(__dirname, app))(router);
      }
    });

  app.use(router.routes());
}

module.exports = initRoutes;
