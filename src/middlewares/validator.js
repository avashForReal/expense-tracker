const { check, validationResult } = require("express-validator")

const newCategoryValidationRules = () => {
    return [
        check('category')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Category is required')
    ]
}

const newExpenseValidationRules = (req, res, next) => {
    return [
        check('expenseName')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Expense name is required'),
        check('expenseCategory')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Expense category is required'),
        check('expenseAmount')
            .not()
            .isEmpty()
            .isFloat({ min: 0 })
            .trim()
            .withMessage('Expense amount must be atleast 0 or more'),
        check('expenseDescription')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Expense description is required'),
        check('expenseDate')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Expense date is required'),
    ]
}

const newIncomeValidationRules = (req) => {
    return [
        check('incomeSource')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Income source is required'),
        check('incomeCategory')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Income category is required'),
        check('incomeAmount')
            .not()
            .isEmpty()
            .isFloat({ min: 0 })
            .trim()
            .withMessage('income amount must be atleast 0 or more'),
        check('incomeDescription')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Income description is required'),
        check('incomeDate')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Income date is required'),
    ]
}


const loginValidations = (req) => {
    return [
        check('email')
            .isEmail()
            .trim()
            .withMessage('Email is required'),
        check('password')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Password is required'),
    ]
}

const registerValidations = (req) => {
    return [
        check('username')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Name is required'),
        check('email')
            .isEmail()
            .trim()
            .withMessage('Email is required'),
        check('password')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Password is required'),
    ]
}


const validate = async (req, res, next) => {
    try {

        const errors = validationResult(req)

        // console.log(errors)

        if (errors.isEmpty()) {
            return next()
        }

        // const expenseCategory = await getAllExpenseCategory()

        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))


        req.errors = extractedErrors

        return next()
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    newCategoryValidationRules,
    newExpenseValidationRules,
    newIncomeValidationRules,
    loginValidations,
    registerValidations,
    validate
}