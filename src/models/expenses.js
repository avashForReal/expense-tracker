'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    static associate({ ExpenseCategory, Users }) {
      // define association here
      this.belongsTo(ExpenseCategory, {
        foreignKey: 'expenseCategory',
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
  Expenses.init({
    expenseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expenseCategory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expenseAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expenseDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expenseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Expenses',
    tableName: 'expenses'
  });
  return Expenses;
};