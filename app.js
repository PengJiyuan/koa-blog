
const path = require('path');
const logger = require('koa-logger');
const router = require('./routes');
const koaBody = require('koa-body');
const views = require('koa-views');

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());

app.use(views(path.join(__dirname, '/views'), {
  map: { html: 'swig' }
}));

app.use(koaBody());

app.use(router.routes());

// listen

const port = 3000;

if (!module.parent) app.listen(port);

console.log(`Listen port ${port}`);
