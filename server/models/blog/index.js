function model(sequelize, DataTypes) {
  return sequelize.define('blog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '博客发布者的uuid'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '作者'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '博客标题'
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '博客内容'
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    underscored: true,
    tableName: 'blog'
  });
}

module.exports = model;
