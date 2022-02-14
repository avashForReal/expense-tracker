'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expenseName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expenseCategory: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'expense_categories'
          },
          key: 'id'
        },
        onUpdate:'cascade',
        onDelete:'set null'
      },
      expenseAmount: {
        allowNull: false,
        type: Sequelize.FLOAT.UNSIGNED
      },
      expenseDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expenseDate: {
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
    await queryInterface.dropTable('expenses');
  }
};