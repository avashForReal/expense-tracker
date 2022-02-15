'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Expenses, Incomes }) {
      // define association here
      this.hasMany(Expenses, {
        foreignKey: 'user_id'
      })

      this.hasMany(Incomes, {
        foreignKey: 'user_id'
      })
    }
  }
  Users.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [["user", "admin"]]
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
  });
  return Users;
};