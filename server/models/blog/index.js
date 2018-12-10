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
    mediaPrefix: {
      type: DataTypes.STRING,
      comment: '所属图片的引用前缀'
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
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '博客简介'
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '博客内容'
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '封面图'
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '访问量'
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
