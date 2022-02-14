const { sequelize } = require("../models/index")

const dbConnection = async (seq) => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');
    } catch (error) {
        throw new Error("Unable to connect to database", error)
    }
}

module.exports = dbConnection