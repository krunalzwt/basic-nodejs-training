const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const users = require("../models/usersModel");
const products=require('./productsModel');

const cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: products,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);

users.hasOne(cart, { foreignKey: "user_id", onDelete: "CASCADE" });
cart.belongsTo(users, { foreignKey: "user_id" });

products.hasMany(cart, { foreignKey: "product_id", onDelete: "CASCADE" });
cart.belongsTo(products, { foreignKey: "product_id" });

module.exports = cart;
