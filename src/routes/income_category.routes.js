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

const {checkAuth} = require("../middlewares/auth.middlewares")


router.route('/')
    .get(checkAuth("admin"),index) //get all income categories
    .post(checkAuth("admin"),newCategoryValidationRules(),validate,createOne,index) //add a income category

router.route("/delete/:id")
    .get(checkAuth("admin"),deleteOne) //delete one income category

router.route("/edit/:id")
    .get(checkAuth("admin"),getOne) //get one income category
    .post(checkAuth("admin"),newCategoryValidationRules(),validate,updateOne) //update one income category

module.exports = router