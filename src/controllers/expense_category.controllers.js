const { ExpenseCategory } = require("../models")

// render index page
const index = async (req, res) => {
    try {
        const errors = req.errors
        const message = req.message
        // get all expense category
        const expense_category = await getAll()
        // render category page
        return res.render('expense_category', {
            errors,
            message,
            expense_category
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get all expense categories
const getAll = async (req, res) => {
    try {
        return await ExpenseCategory.findAll({
            attributes: ["id", "category"]
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
        // if errors exists, no need to process others, return
        if (errors) {
            return next()
        }
        const { category } = req.body
        const reqObject = {
            category
        }
        //create new record
        await ExpenseCategory.create(reqObject);
        // add success message
        req.message = "new expense category added"
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
        const category = await ExpenseCategory.findOne({
            where: { id }
        })
        res.render('update_expense_category', {
            expense_category: category
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
        await ExpenseCategory.destroy({
            where: { id }
        })
        return res.redirect('/expense-category')

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
        if (errors) {
            const category = await ExpenseCategory.findOne({
                where: { id }
            })

            return res.render('update_expense_category', {
                errors,
                expense_category: category
            })
        }
        const { category } = req.body
        const newObj = {
            category
        }
        await ExpenseCategory.update(newObj, {
            where: { id }
        })
        // redirect to category page
        res.redirect('/expense-category')
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
    deleteOne,
}