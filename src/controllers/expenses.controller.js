const { Expenses, ExpenseCategory, Users } = require("../models")
const expenseCategoryController = require("./expense_category.controllers")
const _ = require("lodash")
const moment = require("moment")

const index = async (req, res) => {
    try {
        // get information from previous middlewares
        const expenses_message = req.expenses_message
        const errors = req.errors
        const userId = req.user.id

        // get all required data
        const allExpenses = await getAll(userId)
        const expense_category = await expenseCategoryController.getAll()

        const newExpensesArray = []
        allExpenses.map(data => {
            const newdata = _.pick(data, ['id', 'expenseName', 'expenseAmount', 'expenseDescription'])
            newdata.expenseCategory = data['ExpenseCategory.category']
            newdata.expenseDate = moment(data.expenseDate).format('MMMM Do YYYY')
            return newExpensesArray.push(newdata)
        })

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
const getAll = async (userId) => {
    try {
        return await Expenses.findAll({
            include: [{
                model: ExpenseCategory,
                attributes: ["category"]
            },
            {
                model: Users,
                where: {
                    id: userId
                }
            }],
            raw: true
        })
    } catch (e) {
        console.log(e)
        throw new Error("An error occured")
    }
}

// create a new item
const createOne = async (req, res, next) => {
    try {
        const errors = req.errors
        if (errors) {
            return next()
        }
        const userId = req.user.id
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
            expenseDate,
            user_id: userId
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
        const userId = req.user.id
        const { id } = req.params
        const expense = await Expenses.findOne({
            where: { id },
            include: [{
                model: ExpenseCategory,
                attributes: ["category"]
            },
            {
                model: Users,
                where: {
                    id: userId
                }
            }],
            raw: true
        })

        const newObj = {
            id: expense.id,
            expenseName: expense.expenseName,
            expenseCategory: expense['ExpenseCategory.category'],
            expenseAmount: expense.expenseAmount,
            expenseDescription: expense.expenseDescription,
            expenseDate: expense.expenseDate
        }

        const expense_category = await expenseCategoryController.getAll()

        res.render('update_expense', {
            expense: newObj,
            expense_category
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete an items by id
const deleteOne = async (req, res) => {
    try {
        const userId = req.user.id
        const { id } = req.params
        await Expenses.destroy({
            where: { id, user_id:userId }
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
        const userId = req.user.id
        const { id } = req.params
        const errors = req.errors
        const {
            expenseName,
            expenseCategory,
            expenseAmount,
            expenseDescription,
            expenseDate
        } = req.body
        // req id added to send to view for dynamic post route
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
            where: { 
                id,
                user_id: userId
            }
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