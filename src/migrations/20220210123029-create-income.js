'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      incomeSource: {
        allowNull: false,
        type: Sequelize.STRING
      },
      incomeCategory: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'income_categories'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      incomeAmount: {
        allowNull: false,
        type: Sequelize.FLOAT.UNSIGNED
      },
      incomeDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      incomeDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('incomes');
  }
};