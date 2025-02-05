const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const users = require("../models/usersModel");
const products = require("./productsModel");

const wishlist = sequelize.define(
  "wishlist",
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
      unique:true,
      references: {
        model: products,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "wishlist",
    timestamps: false,
    createdAt:"created_at"
  }
);

users.hasMany(wishlist, { foreignKey: "user_id", onDelete: "CASCADE" });
wishlist.belongsTo(users, { foreignKey: "user_id" });

products.hasMany(wishlist, { foreignKey: "product_id", onDelete: "CASCADE" });
wishlist.belongsTo(products, { foreignKey: "product_id" });


module.exports = wishlist;
