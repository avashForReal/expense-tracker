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
const adminRoutes = require("../src/routes/admin.routes")
const { selectOption, formatDate } = require("./utils/handlebars")

// env config
dotenv.config();

const PORT = process.env.PORT || 8080;

const init = async () => {
    try {
        await dbConnection()

        const app = express()

        // view engine setup
        app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { selectOption, formatDate } }));
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
        app.use('/', homeRoutes)
        app.use('/expenses', expensesRoutes)
        app.use('/incomes', incomesRoutes)

        //route for admin only
        app.use('/admin', adminRoutes)
        app.use('/income-category', incomeCategoryRoutes)
        app.use('/expense-category', expenseCategoryRoutes)

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

