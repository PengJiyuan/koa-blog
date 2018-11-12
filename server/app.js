
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
router.get('/', list);
// router.get('/post/new', add);
// router.get('/post/:id', show);
// router.post('/post', create);
router.get('/api/blog/list', apiBlog.getList);

// POST /login
router.post('/api/login', (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user === false) {
      ctx.response.status = 401;
      ctx.response.body = 'Auth Error!';
    } else {
      ctx.body = { success: true };
      ctx.login(user);
    }
  })(ctx);
});

router.get('/api/logout', (ctx) => {
  ctx.body = {logout: true};
  ctx.logout();
});

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx) {
  if(!ctx.isAuthenticated()) {
    ctx.redirect('/login');
  } else {
    await ctx.render('../../client/public/views/blog/blog.ejs');
  }
}

async function auth(ctx, next) {
  if(ctx.isAuthenticated()) {
    ctx.redirect('/');
  } else {
    await ctx.render('../../client/public/views/auth/auth.ejs');
  }
}

/**
 * Show creation form.
 */

async function add(ctx) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show(ctx) {
  async function getPostById(id) {
    const sql = `SELECT * FROM post where id=${id}`;
    return await query(sql);
  }
  const id = ctx.params.id;
  const post = await getPostById(id);
  await ctx.render('show', { post: post[0] });
}

/**
 * Create a post.
 */

async function create(ctx) {
  async function insert(data) {
    const sql = 'INSERT INTO post SET ?';
    await query(sql, data);
  }
  const post = ctx.request.body;
  post.created_at = new Date();
  await insert(post);
  ctx.redirect('/');
}

// listen
if (!module.parent) app.listen(config.port);

console.log(`Listen port ${config.port}`);
