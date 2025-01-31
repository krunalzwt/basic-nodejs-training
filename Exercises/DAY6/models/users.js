const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection.js");
const {userProfiles}=require('../models/userProfile.js');
const {userImages}=require('../models/userImages.js');


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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "User"),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

users.associate = (models) => {
  // User has one UserProfile (one-to-one)
  users.hasOne(userProfiles, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
  });

  // User has many UserImages (one-to-many)
  users.hasMany(userImages, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
  });
};


module.exports = users;
