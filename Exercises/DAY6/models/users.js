const { DataTypes } = require('sequelize');
const {sequelize} =require('../config/dbConnection.js');
 

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  role:{
    type:DataTypes.ENUM('Admin','User'),
    allowNull:false
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  }
});

module.exports = users;
