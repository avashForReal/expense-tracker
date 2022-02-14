const incomesController = require("../controllers/incomes.controller")
const expensesController = require("../controllers/expenses.controller")
// const expenseCategoryController = require("../controllers/expense_category.controllers")
// const incomeCategoryController = require("../controllers/income_category.controllers")
const { calcExpense, calcIncome } = require("../utils/calcTotal")

// home index
const index = async (req, res) => {
    try {
        const allIncomes = await incomesController.getAll()
        const allExpenses = await expensesController.getAll()

        const totalIncomeAmount = calcIncome(allIncomes)
        const totalExpenseAmount = calcExpense(allExpenses)
        const availableBalance = totalIncomeAmount - totalExpenseAmount
        // render the home page
        return res.render('home', {
            availableBalance,
            totalIncomeAmount,
            totalExpenseAmount
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = { index }