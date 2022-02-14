'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Expenses }) {
      // define association here
      this.hasMany(Expenses, {
        foreignKey: 'expenseCategory'
      })
    }
  }

  ExpenseCategory.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ExpenseCategory',
    tableName: 'expense_categories'
  });
  return ExpenseCategory;
};