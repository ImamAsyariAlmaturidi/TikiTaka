'use strict';
const Helper = require('../helpers/helper')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [8, 20],
        notNull: true,
        notEmpty: true
      }
    },
    Role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['User', 'Admin']]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async function(instance, options){
    const newPassword = await Helper.hashingPassword(instance.password)
    instance.password = newPassword
    instance.Role = 'User'
  })
  return User;
};