'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfilePost.belongsTo(models.Post)
      ProfilePost.belongsTo(models.Profile)
    }
  }
  ProfilePost.init({
    name: DataTypes.STRING,
    PostId: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProfilePost',
  });
  return ProfilePost;
};