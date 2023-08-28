const {Sequelize} = require("sequelize");
const {sequelize} = require("../db")

const Sauce = sequelize.define("sauces", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
  });

module.exports = Sauce;


