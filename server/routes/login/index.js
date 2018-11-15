function routeLogin(router) {

  router.get('/login', auth);

  async function auth(ctx, next) {
    if(ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      await ctx.render('../../client/public/views/auth/auth.ejs', {userInfo: null});
    }
  }

  // POST /login
  router.post('/api/login', (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user === false) {
        ctx.response.status = 401;
        ctx.response.body = 'Auth Error!';
      } else {
        ctx.state.user = user;
        ctx.body = { success: true, user };
        ctx.login(user);
      }
    })(ctx);
  });

  router.get('/api/logout', (ctx) => {
    ctx.state.user = null;
    ctx.body = {logout: true};
    ctx.logout();
  });
}

module.exports = routeLogin;
