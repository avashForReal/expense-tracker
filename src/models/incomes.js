'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incomes extends Model {
    static associate({ IncomeCategory, Users }) {
      // define association here
      this.belongsTo(IncomeCategory, {
        foreignKey: 'incomeCategory',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })

      this.belongsTo(Users, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    }
  }
  Incomes.init({
    incomeSource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    incomeCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    incomeAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    incomeDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    incomeDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Incomes',
    tableName: 'incomes'
  });
  return Incomes;
};