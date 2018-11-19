const fs = require('fs');
const path = require('path');
const sequelize = require('../drivers/sequelize');

const db = {};

fs.readdirSync(path.join(__dirname))
  .filter(dir => dir !== 'index.js')
  .forEach(app => {
    const models = fs.statSync(path.join(__dirname, app));
    if (models.isDirectory()) {
      const model = require(path.join(__dirname, app))(sequelize, sequelize.Sequelize);
      db[model.name] = model;
    }
  });

db.sequelize = sequelize;
sequelize.sync({alter: true, logging: true}).then(async () => {
  console.log('MySQL sync Done');
  // 如果user表中没有用户，创建一个默认用户
  const users = await db.user.findAndCountAll();
  if (users.count < 1) {
    await db.user.create({username: 'peng', password: '1234'});
    console.log('Create default user success!');
  }
}).catch(console.error);

module.exports = db;
