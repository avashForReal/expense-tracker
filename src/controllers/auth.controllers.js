const { Users } = require("../models")
const { hashPassword, comparePassword } = require("../utils/bcrypt")
const { generateToken, validateToken } = require("../utils/jwt")
const _ = require('lodash')

const loginIndex = async (req, res, next) => {
    try {
        return res.render('login')
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

const registerIndex = async (req, res, next) => {
    try {
        return res.render('register')
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        if (req.errors) {
            return res.render('login', {
                errors: req.errors,
                body
            })
        }
        const oldUser = await Users.findOne({
            where: {
                email: body.email
            }
        });
        // if no user is found
        if (!oldUser) {
            return res.render('login', {
                user_message: 'User not found',
                body
            })
        }
        // if passwords do not match
        if (!comparePassword(body.password, oldUser.password)) {
            return res.render('login', {
                user_message: 'Invalid credentials',
                body
            })
        }
        // generate jwt token
        const payload = { id: oldUser.id, email:oldUser.email, role:oldUser.role }
        const token = generateToken(payload);
        
        res.cookie('auth-token',token)
        if(oldUser.role === "admin"){
            return res.render('admin')
        }
        
        return res.redirect('/')

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

const registerUser = async (req, res, next) => {
    try {
        const body = _.pick(req.body, ['username', 'email', 'password']);
        // if errors from validation, return with errors
        if (req.errors) {
            return res.render('register', {
                errors: req.errors,
                body
            })
        }
        const oldUser = await Users.findOne({
            where: {
                email: body.email
            }
        })
        if (oldUser) {
            return res.render('register', {
                email_message: 'Email already exists',
                body
            })

        }
        // hash pw
        body.password = hashPassword(body.password)
        // add user role, defaults to "user"
        // body.role = req.body.role || "user"
        body.role = "user"
        // register the user
        await Users.create(body)
        // redirect to login
        res.render('register', {
            success: 'Registered. Please login'
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }

}

module.exports = { loginIndex, registerIndex, loginUser, registerUser }