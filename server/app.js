
const path = require('path');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const views = require('koa-views');
const router = require('koa-router')();
const serve = require('koa-static');
const mount = require('koa-mount');
const session = require('koa-session');
const passport = require('koa-passport');
const config = require('./config/config');
const apiBlog = require('./api/blog');
// const apiLogin = require('./api/login');

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());
app.use(koaBody());

app.use(views(path.join(__dirname, '/views'), {
  extension: 'ejs'
}));

const maxAge = 365 * 24 * 60 * 60;

app.use(mount('/views', serve(path.resolve(__dirname, '../client/public/views')), { maxAge }));

// sessions
app.keys = ['your-session-secret'];
app.use(session({}, app));

require('./auth');
app.use(passport.initialize());
app.use(passport.session());

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

/**
 * Post listing.
 */

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

// listen
if (!module.parent) app.listen(config.port);

console.log(`Listen port ${config.port}`);
