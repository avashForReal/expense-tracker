const { IncomeCategory } = require("../models")

// render index page
const index = async (req, res) => {
    try {
        const errors = req.errors
        const message = req.message
        // find all income category
        const income_category = await getAll()
        return res.render('income_category', {
            errors,
            message,
            income_category
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get all items
const getAll = async (req, res) => {
    try {
        return await IncomeCategory.findAll({
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
        if (errors) {
            return next()
        }
        const { category } = req.body
        const reqObject = {
            category
        }
        //create new record
        await IncomeCategory.create(reqObject);
        // add success message
        req.message = "new income category added"
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
        const category = await IncomeCategory.findOne({
            where: { id }
        })
        // render update page
        res.render('update_income_category', {
            income_category: category
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
        await IncomeCategory.destroy({
            where: { id }
        })
        // console.log("running outside");
        return res.redirect('/income-category')

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
            const category = await IncomeCategory.findOne({
                where: { id }
            })
            return res.render('update_income_category', {
                errors,
                income_category: category
            })
        }
        const { category } = req.body
        const newObj = {
            category
        }
        await IncomeCategory.update(newObj, {
            where: { id }
        })
        res.redirect('/income-category')
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