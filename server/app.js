
const path = require('path');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const views = require('koa-views');
const initRoutes = require('./routes');
const serve = require('koa-static');
const mount = require('koa-mount');
const session = require('koa-session');
const passport = require('koa-passport');
const config = require('./config/config');

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

initRoutes(app);

// listen
if (!module.parent) app.listen(config.port);

console.log(`Listen port ${config.port}`);
