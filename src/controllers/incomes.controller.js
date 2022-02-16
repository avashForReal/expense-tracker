const { Incomes, IncomeCategory, Users } = require("../models")
const incomeCategoryController = require("./income_category.controllers")
const _ = require("lodash")
const moment = require("moment")

const index = async (req, res) => {
    try {
        // get information from previous middlewares
        const incomes_message = req.incomes_message
        const errors = req.errors
        const userId = req.user.id

        // get all required data
        const allIncomes = await getAll(userId)
        const income_category = await incomeCategoryController.getAll()

        const newIncomesArray = []
        allIncomes.map(data => {
            const newdata = _.pick(data, ['id', 'incomeSource', 'incomeAmount', 'incomeDescription'])
            newdata.incomeCategory = data['IncomeCategory.category']
            newdata.expenseDate = moment(data.incomeDate).format('MMMM Do YYYY')
            return newIncomesArray.push(newdata)
        })

        return res.render('incomes', {
            errors,
            incomes_message,
            incomes: newIncomesArray,
            income_category
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}


// get all Incomes
const getAll = async (userId) => {
    try {
        return await Incomes.findAll({
            include: [{
                model: IncomeCategory,
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
            incomeSource,
            incomeCategory,
            incomeAmount,
            incomeDescription,
            incomeDate
        } = req.body


        const reqObject = {
            incomeSource,
            incomeCategory,
            incomeAmount,
            incomeDescription,
            incomeDate,
            user_id: userId
        }

        //create new record
        await Incomes.create(reqObject);

        req.incomes_message = "new income added"

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
        const income = await Incomes.findOne({
            where: { id },
            include: [{
                model: IncomeCategory,
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
            id: income.id,
            incomeSource: income.incomeSource,
            incomeCategory: income['IncomeCategory.category'],
            incomeAmount: income.incomeAmount,
            incomeDescription: income.incomeDescription,
            incomeDate: income.incomeDate
        }

        const income_category = await incomeCategoryController.getAll()

        res.render('update_income', {
            income: newObj,
            income_category
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
        const userId = req.user.id
        await Incomes.destroy({
            where: { 
                id,
                user_id: userId
            }
        })

        return res.redirect('/incomes')
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
            incomeSource,
            incomeCategory,
            incomeAmount,
            incomeDescription,
            incomeDate
        } = req.body
        // req id added to send to view for dynamic post route
        const reqObject = {
            id,
            incomeSource,
            incomeCategory,
            incomeAmount,
            incomeDescription,
            incomeDate
        }
        if (errors) {
            const income_category = await incomeCategoryController.getAll()

            return res.render('update_income', {
                errors,
                income: reqObject,
                income_category
            })
        }

        delete reqObject.id;

        await Incomes.update(reqObject, {
            where: { 
                id,
                user_id: userId
            }
        })

        res.redirect('/incomes')
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