const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const users = require("../models/usersModel");
const orders=require('../models/ordersModel');
const products=require('../models/productsModel');

const orderItems = sequelize.define(
  "orderItems",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: orders,
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
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
  },
  {
    tableName: "orderItems",
    timestamps: true,
  }
);

orders.hasMany(orderItems, { foreignKey: "order_id", onDelete: "CASCADE" });
orderItems.belongsTo(orders, { foreignKey: "order_id" });

products.hasMany(orderItems, { foreignKey: "product_id", onDelete: "CASCADE" });
orderItems.belongsTo(products, { foreignKey: "product_id" });


module.exports = orderItems;
