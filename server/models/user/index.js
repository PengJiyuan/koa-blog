function model(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
