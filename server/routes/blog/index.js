const apiBlog = require('./controller');
const path = require('path');
const fs = require('fs-extra');
const multer = require('koa-multer');
const config = require('../../config/config');

const uploadPath = config.uploadPath;

const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const u = req.body.uuid;
    fs.mkdirp(path.join(uploadPath, 'blog-images', u), err => {
      if (err) {
        cb(err);
      } else {
        cb(null, `blog-images/${u}/${file.originalname}`);
      }
    });
  }
});

const uploadImages = multer({ storage: storageImages });

const storageCover = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    fs.mkdirp(path.join(uploadPath, 'cover'), err => {
      if (err) {
        cb(err);
      } else {
        cb(null, `cover/${file.originalname}`);
      }
    });
  }
});

const uploadCover = multer({ storage: storageCover});

function routeBlog(router) {

  router.get('/', blog);
  router.get('/blog/(.*)', blog);
  router.get('/api/blog', apiBlog.getList);
  // 删除博客
  router.delete('/api/blog', apiBlog.deleteBlog);
  router.post('/api/publish', apiBlog.publishBlog);
  router.put('/api/publish', apiBlog.updateBlog);
  router.post('/api/uploadFile', uploadImages.single('file'), apiBlog.uploadFile);
  router.post('/api/uploadCover', uploadCover.single('cover'), apiBlog.uploadCover);

  async function blog(ctx) {
    // switch(ctx.path) {
    //   // 必须登录才能发表
    //   case '/blog/publish'
    //   case '/blog/publish':
    //   case '/blog/update':
    //     if (ctx.isUnauthenticated()) {
    //       ctx.redirect('/login');
    //     } else {
    //       await ctx.render('../../client/public/views/blog/blog.ejs', {userInfo: ctx.state.user});
    //     }
    //     break;
    //   default:
    //     await ctx.render('../../client/public/views/blog/blog.ejs', {userInfo: ctx.state.user});
    //     break;
    // }
    if (ctx.isUnauthenticated()) {
      ctx.redirect('/login');
    } else {
      await ctx.render('../../client/public/views/blog/blog.ejs', {userInfo: ctx.state.user});
    }
  }
}

module.exports = routeBlog;
