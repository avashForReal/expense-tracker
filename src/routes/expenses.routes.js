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

const {checkAuth} = require("../middlewares/auth.middlewares")

router.route('/')
    .get(checkAuth("user"),index)
    .post(checkAuth("user"),newExpenseValidationRules(), validate, createOne, index) //add a expenses

router.route('/delete/:id')
    .get(checkAuth("user"),deleteOne)

router.route('/edit/:id')
    .get(checkAuth("user"),getOne) // get a expense
    .post(checkAuth("user"),newExpenseValidationRules(), validate, updateOne) //delete a expense

module.exports = router