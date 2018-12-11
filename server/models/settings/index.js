function model(sequelize, DataTypes) {
  return sequelize.define('settings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户id'
    },
    background_img: {
      type: DataTypes.STRING,
      defaultValue: `/assets/background_img/default${Math.ceil(Math.random() * 4)}.jpg`,
      comment: '背景图'
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    underscored: true,
    tableName: 'settings'
  });
}

module.exports = model;
