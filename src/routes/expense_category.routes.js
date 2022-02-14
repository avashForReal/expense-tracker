const express = require("express")
const router = express.Router()

// import controllers
const {
    index,
    createOne,
    getOne,
    updateOne,
    deleteOne
} = require("../controllers/expense_category.controllers")

// validation middleware
const {
    newCategoryValidationRules,
    validate
} = require("../middlewares/validator")

router.route('/')
    .get(index) //get all expense categories
    .post(newCategoryValidationRules(), validate, createOne, index) //add a expense category

router.route('/delete/:id')
    .get(deleteOne) // delete a expense category

router.route('/edit/:id')
    .get(getOne) //get one expense
    .post(newCategoryValidationRules(), validate, updateOne) //update one expense

module.exports = router