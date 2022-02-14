const express = require("express")
const router = express.Router()

// import controllers
const {
    index,
    createOne,
    getOne,
    updateOne,
    deleteOne
} = require("../controllers/expenses.controller")

const {
    newExpenseValidationRules,
    validate
} = require("../middlewares/validator")

router.route('/')
    .get(index)
    .post(newExpenseValidationRules(), validate, createOne, index) //add a expenses

router.route('/delete/:id')
    .get(deleteOne)

router.route('/edit/:id')
    .get(getOne) // get a expense
    .post(newExpenseValidationRules(), validate, updateOne) //delete a expense

module.exports = router