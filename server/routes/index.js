const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function initRoutes(app) {
  // 只有登录之后的用户才可以进行发表博客
  router.use(['/api/publish', '/api/uploadFile'], async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { statusCode: 403, errors: [{ message: '授权失败，请登录' }] };
    }
  });

  fs.readdirSync(path.join(__dirname))
    .filter(dir => dir !== 'index.js')
    .forEach((ap) => {
      const models = fs.statSync(path.join(__dirname, ap));
      if (models.isDirectory()) {
        require(path.join(__dirname, ap))(router);
      }
    });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = initRoutes;
