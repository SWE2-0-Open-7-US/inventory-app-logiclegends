const {sequelize} = require('../db')
const Item = require("./Items")
const Sauce = require("./Sauces")
const User = require("./Users")




module.exports = {
  db: sequelize,
  Sauce,Item, User
};
