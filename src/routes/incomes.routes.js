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

router.route('/')
    .get(index)
    .post(newIncomeValidationRules(), validate, createOne, index) //add an income

router.route('/delete/:id')
    .get(deleteOne)

router.route('/edit/:id')
    .get(getOne)
    .post(newIncomeValidationRules(), validate, updateOne)

module.exports = router