const router = require('koa-router')();
const apiBlog = require('../api/blog');

function initRoutes(app) {
  router.get('/login', auth);
  router.get('/', blog);
  router.get('/blog/(.*)', blog);
  router.post('/api/publish', apiBlog.publish);
  router.get('/api/blog', apiBlog.getList);
  router.get('/api/blog/:id', apiBlog.getBlogById);

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

  app.use(router.routes());

  async function blog(ctx) {
    console.log(ctx.path)
    switch(ctx.path) {
      // 必须登录才能发表
      case '/blog/publish':
        if (ctx.isUnauthenticated()) {
          ctx.redirect('/');
        } else {
          await ctx.render('../../client/public/views/blog/blog.ejs', {userInfo: ctx.state.user});
        }
        break;
      default:
        await ctx.render('../../client/public/views/blog/blog.ejs', {userInfo: ctx.state.user});
        break;
    }
  }
  
  async function auth(ctx, next) {
    if(ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      await ctx.render('../../client/public/views/auth/auth.ejs', {userInfo: null});
    }
  }
}

module.exports = initRoutes;
