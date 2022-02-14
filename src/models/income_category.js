'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IncomeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Incomes }) {
      // define association here
      this.hasMany(Incomes, {
        foreignKey: 'incomeCategory'
      })
    }
  }
  IncomeCategory.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'IncomeCategory',
    tableName: 'income_categories'
  });
  return IncomeCategory;
};