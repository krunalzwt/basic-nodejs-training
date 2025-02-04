const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize ({
    database: process.env.MYSQL_DATABASE2,
    username: process.env.MYSQL_USER2,
    password: process.env.MYSQL_PASSWORD2,
    host: process.env.MYSQL_HOST2,
    dialect:'mysql',
    pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
    }
  });

  module.exports = {sequelize};