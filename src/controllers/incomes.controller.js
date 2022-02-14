const { Incomes, IncomeCategory } = require("../models")
const incomeCategoryController = require("./income_category.controllers")
const moment = require("moment")

const index = async (req, res) => {
    try {
        // get information from previous middlewares
        const incomes_message = req.incomes_message
        const errors = req.errors

        // get all required data
        const allIncomes = await getAll()
        const income_category = await incomeCategoryController.getAll()

        const newIncomesArray = []
        allIncomes.map(data => newIncomesArray.push({
            id: data.id,
            incomeSource: data.incomeSource,
            incomeCategory: data['IncomeCategory.category'],
            incomeAmount: data.incomeAmount,
            incomeDescription: data.incomeDescription,
            incomeDate: moment(data.incomeDate).format('MMMM Do YYYY')
        }))

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
const getAll = async (req, res) => {
    try {
        return await Incomes.findAll({
            include: {
                model: IncomeCategory,
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
            incomeDate
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
        const { id } = req.params
        const income = await Incomes.findOne({
            where: { id },
            include: {
                model: IncomeCategory,
                attributes: ["category"]
            },
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
        await Incomes.destroy({
            where: { id }
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
        const { id } = req.params
        const errors = req.errors
        const {
            incomeSource,
            incomeCategory,
            incomeAmount,
            incomeDescription,
            incomeDate
        } = req.body

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
            where: {id}
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