const {Sequelize} = require("sequelize");
const {sequelize} = require("../db");

const User = sequelize.define("users", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
})

module.exports = User