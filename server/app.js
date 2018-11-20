
const path = require('path');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const initRoutes = require('./routes');
const initPassport = require('./auth');
const serve = require('koa-static');
const mount = require('koa-mount');
const session = require('koa-session');
const config = require('./config/config');

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());
app.use(bodyParser());

app.use(views(path.join(__dirname, '/views'), {
  extension: 'ejs'
}));

const maxAge = 365 * 24 * 60 * 60;

app.use(mount('/views', serve(path.resolve(__dirname, '../client/public/views')), { maxAge }));
app.use(mount('/upload', serve(path.resolve(__dirname, '../upload')), { maxAge }));

// sessions
app.keys = ['your-session-secret'];
app.use(session({}, app));

initPassport(app);
initRoutes(app);

// listen
if (!module.parent) app.listen(config.port);

console.log(`Listen port ${config.port}`);
