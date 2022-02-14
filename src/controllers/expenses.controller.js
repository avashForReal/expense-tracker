const { Expenses, ExpenseCategory } = require("../models")
const expenseCategoryController = require("./expense_category.controllers")
const moment = require("moment")

const index = async (req, res) => {
    try {
        // get information from previous middlewares
        const expenses_message = req.expenses_message
        const errors = req.errors


        // get all required data
        const allExpenses = await getAll()
        const expense_category = await expenseCategoryController.getAll()

        const newExpensesArray = []
        allExpenses.map(data => newExpensesArray.push({
            id: data.id,
            expenseName: data.expenseName,
            expenseCategory: data['ExpenseCategory.category'],
            expenseAmount: data.expenseAmount,
            expenseDescription: data.expenseDescription,
            expenseDate: moment(data.expenseDate).format('MMMM Do YYYY')
        }))

        return res.render('expenses', {
            errors,
            expenses_message,
            expenses: newExpensesArray,
            expense_category,
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get all expenses
const getAll = async (req, res) => {
    try {
        return await Expenses.findAll({
            include: {
                model: ExpenseCategory,
                attributes: ["category"]
            },
            raw: true
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// create a new item
const createOne = async (req, res, next) => {
    try {
        const errors = req.errors
        if (errors) {
            return next()
        }

        const {
            expenseName,
            expenseCategory,
            expenseAmount,
            expenseDescription,
            expenseDate
        } = req.body


        const reqObject = {
            expenseName,
            expenseCategory,
            expenseAmount,
            expenseDescription,
            expenseDate
        }

        //create new record
        await Expenses.create(reqObject);

        // const expense_category = await ExpenseCategory.findAll()
        req.expenses_message = "new expense added"

        return next()
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get one by id
const getOne = async (req, res) => {
    try {
        const { id } = req.params
        const expense = await Expenses.findOne({
            where: { id },
            include: {
                model: ExpenseCategory,
                attributes: ["category"]
            },
            raw: true
        })

        const newObj = {
            id: expense.id,
            expenseName: expense.expenseName,
            expenseCategory: expense['ExpenseCategory.category'],
            expenseAmount:expense.expenseAmount,
            expenseDescription:expense.expenseDescription,
            expenseDate:expense.expenseDate 
        }

        res.render('update_expense', {
            expense: newObj
        })

       
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an items by id
const deleteOne = async (req, res) => {
    try {
        const { id } = req.params
        await Expenses.destroy({
            where: { id }
        })

        return res.redirect('/expenses')

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update one by id
const updateOne = async (req, res) => {
    try {
        const { id } = req.params
        const errors = req.errors
        const {
            expenseName,
            expenseCategory,
            expenseAmount,
            expenseDescription,
            expenseDate
        } = req.body

        const reqObject = {
            id,
            expenseName,
            expenseCategory,
            expenseAmount,
            expenseDescription,
            expenseDate
        }
        if (errors) {
            const expense_category = await expenseCategoryController.getAll()

            return res.render('update_expense', {
                errors,
                expense: reqObject,
                expense_category
            })
        }

        delete reqObject.id;

        await Expenses.update(reqObject, {
            where: {id}
        })

        res.redirect('/expenses')

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}


module.exports = {
    index,
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}