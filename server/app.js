
const path = require('path');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const views = require('koa-views');
const router = require('koa-router')();
const config = require('./config/config');
const { query } = require('./mysql/query');

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());

app.use(views(path.join(__dirname, '/views'), {
  map: { html: 'swig' }
}));

app.use(koaBody());

router.get('/', list);
router.get('/post/new', add);
router.get('/post/:id', show);
router.post('/post', create);

/**
 * Post listing.
 */

async function list(ctx) {
  async function selectAllData() {
    const sql = 'SELECT * FROM post';
    return await query(sql);
  }
  await ctx.render('list', { posts: await selectAllData() });
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

app.use(router.routes());

// listen
if (!module.parent) app.listen(config.port);

console.log(`Listen port ${config.port}`);
