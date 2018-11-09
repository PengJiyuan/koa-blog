
const passport = require('koa-passport');
const { query } = require('./mysql/query');

async function fetchUserById(id) {
  const sql = 'SELECT * FROM user WHERE id = ?';
  return await query(sql, [id]);
}

async function fetchUserByUserName(username) {
  const sql = 'SELECT * FROM user WHERE username = ?';
  return await query(sql, [username]);
}

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch(err) {
    done(err);
  }
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUserById(id);
    done(null, user[0]);
  } catch(err) {
    done(err);
  }
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await fetchUserByUserName(username);
  if (user && user.length > 0 && username === user[0].username && password === user[0].password) {
    done(null, user[0]);
  } else {
    done(null, false);
  }
}))
