const apiUser = require('./controller');

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

  async function user(ctx) {
    await ctx.render('../../client/public/views/user/user.ejs', { userInfo: ctx.state.user });
  }
}

module.exports = routeUser;
