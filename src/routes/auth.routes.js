const express = require("express")
const router = express.Router()

// import controllers
const {
    loginIndex,
    registerIndex,
    loginUser,
    registerUser
} = require("../controllers/auth.controllers")

// validation middleware
const {
    loginValidations,
    registerValidations,
    validate
} = require("../middlewares/validator")

router.route('/login')
    .get(loginIndex)
    .post(loginValidations(), validate, loginUser) //login 

router.route('/register')
    .get(registerIndex)
    .post(registerValidations(), validate, registerUser) //register user

module.exports = router