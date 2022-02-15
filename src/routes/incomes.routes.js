const express = require("express")
const router = express.Router()

// import controllers
const {
    index,
    createOne,
    getOne,
    updateOne,
    deleteOne
} = require("../controllers/incomes.controller")

const {
    validate,
    newIncomeValidationRules
} = require("../middlewares/validator")

const {checkAuth} = require("../middlewares/auth.middlewares")

router.route('/')
    .get(checkAuth("user"),index)
    .post(checkAuth("user"),newIncomeValidationRules(), validate, createOne, index) //add an income

router.route('/delete/:id')
    .get(checkAuth("user"),deleteOne)

router.route('/edit/:id')
    .get(checkAuth("user"),getOne)
    .post(checkAuth("user"),newIncomeValidationRules(), validate, updateOne)

module.exports = router