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

const {checkAuth} = require("../middlewares/auth.middlewares")

router.route('/')
    .get(checkAuth("admin"),index) //get all expense categories
    .post(checkAuth("admin"),newCategoryValidationRules(), validate, createOne, index) //add a expense category

router.route('/delete/:id')
    .get(checkAuth("admin"),deleteOne) // delete a expense category

router.route('/edit/:id')
    .get(checkAuth("admin"),getOne) //get one expense
    .post(checkAuth("admin"),newCategoryValidationRules(), validate, updateOne) //update one expense

module.exports = router