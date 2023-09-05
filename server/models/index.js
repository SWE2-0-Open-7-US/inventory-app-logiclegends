const {sequelize} = require('../db')
const Item = require("./Items")
const User = require("./Users")
const Order = require("./Orders")

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: 'OrderItem' });
Item.belongsToMany(Order, { through: 'OrderItem' });


module.exports = {
  db: sequelize,
  Item, User, Order
};
