const express = require("express")
const router = express.Router()

// import controllers
const {
    index,
    createOne,
    getOne,
    updateOne,
    deleteOne
} = require("../controllers/income_category.controllers")

const {
    newCategoryValidationRules,
    validate
} = require("../middlewares/validator")

router.route('/')
    .get(index) //get all income categories
    .post(newCategoryValidationRules(),validate,createOne,index) //add a income category

router.route("/delete/:id")
    .get(deleteOne) //delete one income category

router.route("/edit/:id")
    .get(getOne) //get one income category
    .post(newCategoryValidationRules(),validate,updateOne) //update one income category

module.exports = router