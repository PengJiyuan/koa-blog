function model(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: '是否为管理员'
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      comment: '用户名'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: `/assets/avatar/default${Math.ceil(Math.random()*4)}.jpeg`,
      comment: '头像'
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    underscored: true,
    tableName: 'user'
  });
}

module.exports = model;
