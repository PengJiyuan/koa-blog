const apiUser = require('./controller');
const path = require('path');

function routeBlog(router) {

  router.use(['/admin'], async(ctx, next) => {
    if (ctx.state.user && ctx.state.user.admin) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {statusCode: 403, errors: [{message: '授权失败，请登录'}]};
    }
  });

  router.get('/admin(/?.*)', admin);
  router.get('/api/users', apiUser.getList);
  router.post('/api/user/create', apiUser.createUser);

  async function admin(ctx) {
    await ctx.render('../../client/public/views/admin/admin.ejs', {userInfo: ctx.state.user})
  }
}

module.exports = routeBlog;
