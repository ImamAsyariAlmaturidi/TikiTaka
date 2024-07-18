'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.ProfilePost)
    }

   static getBirthDayISO(birth) {
    return birth.toISOString().split('T')[0];
   }
    
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    photo: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    birthOfDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    Likes: DataTypes.INTEGER,
    Following: DataTypes.INTEGER,
    Followers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });

  Profile.beforeCreate(function (instance, options){
    instance.photo = ''
    instance.Followers = 0
    instance.Following = 0
    instance.Likes = 0
  })
  return Profile;
}