const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique:true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = categories;
