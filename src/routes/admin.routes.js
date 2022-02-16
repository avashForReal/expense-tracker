const express = require("express")
const { index } = require("../controllers/admin.controllers")
const router = express.Router()

// const {
//     newCategoryValidationRules,
//     validate
// } = require("../middlewares/validator")

const {checkAuth} = require("../middlewares/auth.middlewares")

router.route('/')
    .get(checkAuth("admin"),index) //get all income categories
    // .post(newCategoryValidationRules(),validate,createOne) //add a income category

// router.route('/:id')
    // .get(getOne) // get a income category
    // .delete(deleteOne) //delete a income category
    // .patch(updateOne) //update a income category

module.exports = router