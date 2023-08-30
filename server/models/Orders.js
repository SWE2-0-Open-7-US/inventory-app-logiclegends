const {Sequelize} = require("sequelize");
const {sequelize} = require("../db");

const Order = sequelize.define('Order', {
});

module.exports = Order;