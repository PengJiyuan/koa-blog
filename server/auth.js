
const passport = require('koa-passport');
const User = require('./models').user;

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch(err) {
    done(err);
  }
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ where: {username} });
  console.log(user.username);
  if (username === user.username && password === user.password) {
    done(null, user);
  } else {
    done(null, false);
  }
}))
