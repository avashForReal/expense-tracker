// lib imports
const express = require("express");
const dotenv = require("dotenv");
const exphbs = require('express-handlebars').engine;
const path = require("path")
const cookieParser = require("cookie-parser")

//other imports
const dbConnection = require("./utils/dbConnection")
const incomeCategoryRoutes = require("../src/routes/income_category.routes")
const expenseCategoryRoutes = require("../src/routes/expense_category.routes")
const incomesRoutes = require("../src/routes/incomes.routes")
const expensesRoutes = require("../src/routes/expenses.routes")
const homeRoutes = require("../src/routes/home.routes")
const authRoutes = require("../src/routes/auth.routes")

// middleware import
const { authAdmin, authUser } = require("./middlewares/auth.middlewares")

// env config
dotenv.config();

const PORT = process.env.PORT || 8080;

const init = async () => {
    try {
        await dbConnection()

        const app = express()

        // view engine setup
        app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
        // app.set('views', './views');
        app.set('views', path.join(__dirname, 'views'));

        app.set('view engine', 'hbs');
        app.use(express.static(path.join(__dirname, '..', '/public')));

        app.use(cookieParser())
        app.use(express.json())
        app.use(express.urlencoded({ extended: false }))

        //route for user login and registration
        app.use('/users', authRoutes)

        //route for users, middleware to check
        app.use('/home', authUser,homeRoutes)
        app.use('/expenses', authUser,expensesRoutes)
        app.use('/incomes', authUser,incomesRoutes)

        //route for admin only
        app.use('/income-category', authAdmin, incomeCategoryRoutes)
        app.use('/expense-category', authAdmin, expenseCategoryRoutes)    

        // not found
        app.all("*", (req, res) => res.status(404).json({ message: "Route not found!" }))

        app.listen(PORT || 8080, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}

init()

