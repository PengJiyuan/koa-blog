const apiBlog = require('./controller');

function routeBlog(router) {

  router.get('/', blog);
  router.get('/blog/(.*)', blog);
  router.get('/api/blog', apiBlog.getList);
  // 删除博客
  router.delete('/api/blog', apiBlog.deleteBlog);
  router.get('/api/blog/:id', apiBlog.getBlogById);
  router.post('/api/publish', apiBlog.publishBlog);
  router.put('/api/publish', apiBlog.updateBlog);

  async function blog(ctx) {
    switch(ctx.path) {
      // 必须登录才能发表
      case '/blog/publish':
      case '/blog/update':
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
}

module.exports = routeBlog;
